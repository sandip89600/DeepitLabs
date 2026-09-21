FRONTEND (Dashboard + Marketing Site)
- Next.js (React) + TypeScript
- Tailwind CSS + shadcn/ui
- Zustand or Redux for state management
- Monaco Editor (code editing)

BACKEND
- Node.js (NestJS or Express) or Python (FastAPI) for orchestration API
- WebSocket layer (Socket.io) for real-time preview sync
- Postgres (managed, e.g. via Supabase/Neon/RDS) — per-project DB provisioning
- Redis for session/queue management

AI/AGENT LAYER
- LLM orchestration (Claude/GPT via API) for planning + code generation
- Tool-use framework for file ops, terminal commands, deploy actions
- Vector DB (e.g. Pinecone/pgvector) for project context/memory

INFRASTRUCTURE
- Containerized sandboxes: Firecracker microVMs or gVisor/Docker with strict isolation
- Kubernetes for orchestration/auto-scaling
- CDN: Cloudflare
- Object storage: S3-compatible (project files, assets)

DEPLOYMENT (for user-built apps)
- Auto-generated subdomain per project (wildcard DNS)
- Docker-based deploy pipeline
- Let's Encrypt for auto SSL

BILLING
- Stripe (subscriptions + usage-based billing)

MONITORING
- Sentry (error tracking)
- Datadog or Grafana+Prometheus (infra metrics)