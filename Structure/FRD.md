MODULE: Agent Chat Interface
- FR1: User can type natural language build requests
- FR2: Agent must respond with a plan before executing any build
- FR3: User can approve, edit, or reject the plan
- FR4: Chat history persists per project
- FR5: Agent must stream responses (not wait for full completion)
- FR6: User can interrupt/stop an in-progress build

MODULE: Live Preview
- FR7: Preview updates automatically when files change
- FR8: Preview runs in isolated sandbox per project
- FR9: Preview shows console errors inline
- FR10: User can toggle between desktop/tablet/mobile preview sizes

MODULE: File/Code Editor
- FR11: Full file tree navigation
- FR12: Syntax highlighting for all major languages
- FR13: Manual edits sync back to agent context automatically
- FR14: Diff view for AI-suggested changes before applying

MODULE: Project Management
- FR15: Dashboard lists all projects with thumbnail, name, last edited
- FR16: User can rename, duplicate, delete projects
- FR17: Version history with rollback (last 20 versions minimum)

MODULE: Deployment
- FR18: One-click deploy generates a live URL within 60 seconds
- FR19: Deploy logs visible to user
- FR20: Custom domain connection via DNS instructions (Pro tier)

MODULE: Auth & Billing
- FR21: Email/password + Google OAuth signup
- FR22: Free tier usage caps enforced (builds/month, compute time)
- FR23: Stripe-based subscription upgrade/downgrade
- FR24: Usage dashboard showing remaining credits/quota

MODULE: Workflow Builder (specific)
- FR25: Visual + chat-based trigger/action configuration
- FR26: Support for common triggers (webhook, schedule, form submit, DB change)
- FR27: Support for common actions (send email, API call, DB write, Slack/Discord notify)
- FR28: Test-run mode before activating a workflow
- FR29: Error/failure logs per workflow run