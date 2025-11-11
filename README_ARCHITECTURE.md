# Architecture & Framework — Villa Ops Dashboard

## High-level overview
- Next.js App Router serves UI and server actions (forms, endpoints).
- Prisma is the ORM talking to PostgreSQL (use Supabase for hosted Postgres + auth).
- NextAuth handles authentication (Prisma adapter).
- Tailwind + shadcn/ui for consistent UI components.
- PWA support via manifest and service worker for offline/fast staff mobile use.
- Server actions / API routes accept input from staff devices and write to DB.
- Optional integrations: Supabase realtime (for live room status), WhatsApp API for notifications, Redis/Upstash for caching/queues.

## Data models (Prisma)
- User (with roles OWNER/MANAGER/STAFF)
- Room (status, relations to checklists and maintenance)
- CleaningChecklist (JSON items + notes)
- Maintenance (tickets, photos, status)
- InventoryItem (quantity tracking)

## Notification flow (example)
1. Staff submits cleaning checklist via PWA.
2. Server action writes CleaningChecklist and sets Room.status to AVAILABLE.
3. If checklist indicates NOT_READY, server triggers a notification:
   - create internal notification row
   - call WhatsApp API or push notification to Managers
   - optionally publish event to Supabase realtime channel

## Deployment notes
- Deploy to Vercel for Next.js. Use environment variables for DATABASE_URL and NEXTAUTH_SECRET.
- If using Supabase, create a dedicated DB and set DATABASE_URL to Supabase connection string.
- For PWA, ensure `public/manifest.json` and `public/sw.js` are deployed. Register service worker in client entry.

## Next steps (to polish)
- Implement role-based access control in server actions and pages
- Replace placeholder auth logic with secure password hashing and providers
- Add file upload (images) to Supabase storage for maintenance photos
- Add notification queue (Redis/Upstash) for retries and rate-limiting
- Add unit/integration tests
