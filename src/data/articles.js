export const blogArticles = [
  {
    id: 1,
    slug: 'prisma-multitenancy-swiftstock',
    title: 'Architecting Multi-Tenant Isolation with Prisma & PostgreSQL',
    category: 'SaaS Architecture',
    date: 'August 12, 2026',
    readTime: '6 min read',
    excerpt: 'Deep dive into row-level security, tenant middleware, and optimizing Prisma schemas for isolated multi-tenant SaaS architectures like SwiftStock.',
    content: `
      <h2>The Challenge of Tenant Isolation in SaaS</h2>
      <p>When building modern Software-as-a-Service (SaaS) applications like <strong>SwiftStock</strong>, tenant isolation is the primary architectural concern. You must ensure Company A never sees Company B's inventory, transactions, or user lists. There are three common ways to achieve this database isolation:</p>
      <ul>
        <li><strong>Database-per-tenant:</strong> High isolation, high cost, hard to run database migrations across thousands of databases.</li>
        <li><strong>Schema-per-tenant:</strong> Separate schemas in one database. Reasonable isolation, but connection pools can get bloated.</li>
        <li><strong>Shared database, shared schema (Row-Level Isolation):</strong> Lowest cost, scales effortlessly, but carries the highest risk of accidental data leakage.</li>
      </ul>
      <p>For SwiftStock, we chose the <strong>shared database, shared schema</strong> model using a global <code>tenantId</code> column across all relational models. To enforce isolation robustly without repeating <code>where: { tenantId }</code> in every single query, we designed a Prisma middleware layer.</p>

      <h2>Enforcing Tenant Boundaries with Prisma Extensions</h2>
      <p>Prisma Client Extensions allow us to intercept queries dynamically. Below is an example of our custom tenant-aware Client client extension that automatically inserts the current tenant filter into all query operations:</p>

      <pre><code>
const prisma = new PrismaClient().$extends({
  query: {
    $allModels: {
      async findMany({ args, query }) {
        const tenantId = getActiveTenantId();
        args.where = { ...args.where, tenantId };
        return query(args);
      },
      async findFirst({ args, query }) {
        const tenantId = getActiveTenantId();
        args.where = { ...args.where, tenantId };
        return query(args);
      }
    }
  }
});
      </code></pre>

      <h2>Handling Transactions under Load</h2>
      <p>Inventory management applications are heavily write-intensive. If a tenant checks in 500 items, we must decrement stock and write a transaction log atomically. In Prisma, this is done using sequential transaction helpers:</p>
      <pre><code>
await prisma.$transaction([
  prisma.product.update({
    where: { id: productId },
    data: { quantity: { decrement: amount } }
  }),
  prisma.transaction.create({
    data: {
      tenantId,
      productId,
      type: 'REMOVAL',
      amount
    }
  })
]);
      </code></pre>
      <p>By locking rows during stock adjustments, we prevent race conditions where two simultaneous API calls attempt to allocate the last remaining stock item.</p>
    `
  },
  {
    id: 2,
    slug: 'node-performance-10k-rps',
    title: 'Scaling Node.js APIs to 10,000 Requests Per Second',
    category: 'System Design',
    date: 'July 28, 2026',
    readTime: '5 min read',
    excerpt: 'An engineering checklist for optimizing Express.js workloads: event loop monitoring, Redis caching strategies, connection pooling, and payload compression.',
    content: `
      <h2>The Single-Threaded Myth</h2>
      <p>Many developers believe Node.js cannot scale to heavy traffic due to its single-threaded event loop. However, its asynchronous, non-blocking I/O model makes Node.js exceptionally suited for building highly concurrent network applications. When Event Loop bottlenecks occur, it is almost always due to CPU-heavy synchronous logic running in the main thread.</p>

      <h2>Step 1: Event Loop Monitoring & Cluster Mode</h2>
      <p>To scale, we must utilize all available CPU cores. By default, Node.js runs on a single core. Implementing Cluster mode spawns multiple worker processes that share the same port:</p>
      <pre><code>
import cluster from 'cluster';
import os from 'os';

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Start Express API Server
  app.listen(3000);
}
      </code></pre>

      <h2>Step 2: Intelligent Caching with Redis</h2>
      <p>Database queries are the most expensive part of most requests. We use a Cache-Aside strategy with Redis: if data is in Redis, we serve it immediately; if not, we fetch it from PostgreSQL, cache it for 60 seconds, and return it. This offloads up to 90% of database reads under peak loads:</p>
      <pre><code>
const getProductCached = async (productId) => {
  const cacheKey = \`product:\${productId}\`;
  const cachedData = await redis.get(cacheKey);
  
  if (cachedData) return JSON.parse(cachedData);
  
  const product = await prisma.product.findUnique({ where: { id: productId } });
  await redis.setex(cacheKey, 60, JSON.stringify(product));
  return product;
};
      </code></pre>
    `
  },
  {
    id: 3,
    slug: 'rbac-jwt-security-express',
    title: 'Role-Based Access Control: Beyond Simple JWTs',
    category: 'Security',
    date: 'June 18, 2026',
    readTime: '7 min read',
    excerpt: 'How to design a secure, database-backed RBAC middleware system in Node.js with token verification, refresh rotations, and active session validation.',
    content: `
      <h2>The Problem with Stateless JWTs</h2>
      <p>JSON Web Tokens (JWT) are widely used for stateless authentication. However, their stateless nature presents a security vulnerability: <strong>immediate token revocation is impossible</strong>. If an administrator demotes an editor to a standard user, or bans a user, their JWT remains valid until its expiration date (which might be hours away).</p>

      <h2>Designing a Database-Backed RBAC Middleware</h2>
      <p>To solve this, we implemented a hybrid model for our <strong>Team Task Manager</strong> major project. We use short-lived access tokens (15 minutes) alongside active database verification for critical write operations. Our custom access middleware checks the user's role dynamically:</p>
      <pre><code>
const authorizeRole = (requiredRoles) => {
  return async (req, res, next) => {
    const userRole = req.user.role; // Decoded from JWT
    
    if (!requiredRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Access denied: Insufficient permissions' });
    }
    
    // For sensitive actions, query the database to verify active status
    const dbUser = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!dbUser || dbUser.isBanned) {
      return res.status(401).json({ error: 'Session invalidated' });
    }
    
    next();
  };
};
      </code></pre>

      <h2>Refresh Token Rotation Flow</h2>
      <p>To prevent token theft, we rotate refresh tokens. Every time a client requests a new access token using a refresh token, we revoke that refresh token and issue a new one. If someone attempts to reuse an old refresh token, we detect a breach and invalidate the entire user session list immediately.</p>
    `
  },
  {
    id: 4,
    slug: 'reviewpilot-ai-code-reviews-n8n',
    title: 'ReviewPilot: Automating Code Reviews with n8n & Llama 3.3',
    category: 'Automation',
    date: 'August 15, 2026',
    readTime: '8 min read',
    excerpt: 'Architecting an automated, Git-triggered code review pipeline using n8n workflows, parallel regex scanning, Groq LLM orchestration, and dynamic HTML reports.',
    content: `
      <h2>The Goal: Hands-Free Code Reviews</h2>
      <p>ReviewPilot is a fully automated code review pipeline. Every time you push a commit to GitHub, n8n captures the event, parses the file diffs, runs parallel security checks, audits quality via Groq (Llama 3.3 70B), and emails you a beautifully styled HTML report.</p>

      <h2>The End-to-End Architecture</h2>
      <p>By mapping out our node workflow, we run deterministic regex scanners alongside AI evaluations to catch logical bugs and hardcoded secrets simultaneously:</p>

      <pre><code>
// Conceptual workflow pipeline representation
graph TD
    A[GitHub Push Event] -->|Webhook| B[GitHub Webhook Node]
    B --> C[Extract Commit Info]
    C --> D[Fetch Diff via GitHub API]
    D --> E[Build Analysis Tasks]
    D --> H["Regex Secret Scanner (Parallel)"]
    E --> F[HTTP Request to Groq (3x loop)]
    F --> G[Parse AI Results]
    G --> I[Combine For Email]
    H --> I
    I --> J[Gmail Node (Send HTML Email)]
      </code></pre>
      <p><em>Note: In Mermaid syntax, parenthetical labels must be quoted, e.g. <code>H["Regex Secret Scanner (Parallel)"]</code> to avoid parsing errors.</em></p>

      <h2>Step 1: Parsing Diffs & Token Security</h2>
      <p>When n8n intercepts a commit, it retrieves the patch file. We scan this patch for secrets (like AWS keys or database credentials) using parallel regular expressions. This ensures absolute protection even if the LLM fails:</p>
      <pre><code>
// Fast, deterministic regex safety scanner
const scanSecrets = (diffPatch) => {
  const rules = {
    aws_key: /AKIA[0-9A-Z]{16}/g,
    generic_secret: /secret|password|private_key/i
  };
  return Object.keys(rules).some(key => rules[key].test(diffPatch));
};
      </code></pre>

      <h2>Step 2: AI Execution Loops in n8n</h2>
      <p>Instead of single generic prompts, ReviewPilot splits analysis into three parallel categories: Quality, Bugs, and Security. The payload is sent to Groq's high-speed API running <strong>Llama-3.3-70b-versatile</strong>. n8n dynamically loops through these objects, parsing output blocks and assembling a final consolidated report.</p>
    `
  }
]
