PERFORMANCE
- Agent first response time: < 3 seconds
- Preview container cold start: < 5 seconds
- Page load (marketing site): < 1.5 seconds LCP

SCALABILITY
- Support 10,000 concurrent preview containers at launch scale
- Auto-scale compute based on active build sessions

SECURITY
- All user code runs in isolated, network-restricted sandboxes
- No sandbox has access to another user's data/containers
- Secrets/env vars encrypted at rest
- Rate limiting on all public APIs
- Regular dependency vulnerability scanning on generated code

RELIABILITY
- 99.9% uptime SLA for deployed user apps
- Automatic backups of project files (daily)
- Graceful degradation if AI provider has an outage (queue + retry)

COMPLIANCE
- GDPR-compliant data handling
- SOC 2 roadmap (for enterprise tier, future)

ACCESSIBILITY
- WCAG 2.1 AA compliance for DeepitLabs marketing site and dashboard UI