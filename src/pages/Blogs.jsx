import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

// Define premium backend-focused articles for Nithish's portfolio
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

const Blogs = () => {
  const [filter, setFilter] = useState('All')
  const categories = ['All', 'SaaS Architecture', 'System Design', 'Security', 'Automation']

  const filteredArticles = filter === 'All'
    ? blogArticles
    : blogArticles.filter(art => art.category === filter)

  useEffect(() => {
    // Entrance animations
    gsap.fromTo('.blog-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
    gsap.fromTo('.blog-filter-btn', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.2 })
    gsap.fromTo('.blog-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.3 })
  }, [filter])

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto z-10">
      {/* Back home link */}
      <Link to="/" className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-[#00f0ff] tracking-widest uppercase transition-colors duration-300 mb-12 group" style={{ fontFamily: 'JetBrains Mono' }}>
        <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> Back To Portfolio
      </Link>

      <div className="mb-14">
        <span className="text-[#00f0ff]/60 text-xs tracking-[0.3em] uppercase font-medium block mb-4" style={{ fontFamily: 'JetBrains Mono' }}>Logs & Technical Experiments</span>
        <h1 className="blog-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk' }}>
          Technical <br className="hidden sm:block" /><span className="gradient-text pb-1 inline-block">Insights</span>
        </h1>
        <p className="text-white/40 text-base md:text-lg font-light leading-relaxed max-w-2xl" style={{ fontFamily: 'Inter' }}>
          Deep dives into backend engineering, SaaS architectures, security designs, and distributed databases. Written by Nithish based on real code experiments.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2.5 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`blog-filter-btn px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              filter === cat
                ? 'bg-gradient-to-r from-[#00f0ff] to-[#a855f7] text-[#0a0a0a]'
                : 'bg-white/[0.02] border border-white/[0.06] text-white/45 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white/80'
            }`}
            style={{ fontFamily: 'JetBrains Mono' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(art => (
            <Link
              key={art.id}
              to={`/blog/${art.slug}`}
              className="blog-card group flex flex-col justify-between p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/[0.01] to-[#a855f7]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] text-[#00f0ff]/70 font-semibold tracking-widest uppercase bg-[#00f0ff]/5 border border-[#00f0ff]/15 px-2.5 py-1 rounded-md" style={{ fontFamily: 'JetBrains Mono' }}>
                    {art.category}
                  </span>
                  <span className="text-[10px] text-white/20 tracking-wider" style={{ fontFamily: 'JetBrains Mono' }}>
                    {art.date}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white/90 group-hover:text-white transition-colors mb-3" style={{ fontFamily: 'Space Grotesk' }}>
                  {art.title}
                </h2>
                <p className="text-white/35 text-xs md:text-sm leading-relaxed font-light mb-6" style={{ fontFamily: 'Inter' }}>
                  {art.excerpt}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between text-xs font-semibold tracking-widest uppercase text-[#00f0ff]/70 group-hover:text-[#00f0ff] transition-colors" style={{ fontFamily: 'JetBrains Mono' }}>
                <span>Read Article →</span>
                <span className="text-white/20">{art.readTime}</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-20 text-white/30 font-light border border-white/[0.05] rounded-2xl bg-white/[0.01]" style={{ fontFamily: 'Inter' }}>
            No articles found in this category.
          </div>
        )}
      </div>
    </section>
  )
}

export default Blogs
