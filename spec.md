# Birthday Party RSVP App - Project Specification

**Project Name:** Mila and Lia's 5th Birthday Celebration  
**Repository:** https://github.com/skyspeak/birthday  
**Production URL:** https://birthday-invite-lovat.vercel.app  
**Local Path:** `/Users/gliu/Documents/Cursor_Projects/birthday-invite`  
**Status:** ✅ **LIVE IN PRODUCTION**  
**Last Updated:** February 12, 2026

---

## Current State

### 🎯 Application Overview

A fully functional, beautifully designed birthday party invitation and RSVP system with:

- **Custom URL invites** with preset kid counts for each invitee
- **Frozen kid counter** - invitees can only decrease (not increase) the number of kids
- **Castle gate opening animation** as the welcome experience
- **Real-time guest list** showing RSVPs as they come in
- **Admin dashboard** with detailed RSVP tracking and statistics
- **Mobile-first responsive design** optimized for all devices
- **Scandinavian-inspired aesthetics** with whimsical multi-theme (cat/mermaid/unicorn/dog)

### 📊 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** Prisma 7 + PostgreSQL (Prisma Postgres via Vercel)
- **Database Adapter:** @prisma/adapter-pg with node-postgres (pg)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Carousel:** Embla Carousel (with autoplay)
- **Language:** TypeScript
- **Hosting:** Vercel (Production)
- **Deployment:** ✅ LIVE at https://birthday-invite-lovat.vercel.app

### 🗂️ Project Structure

```
birthday-invite/
├── prisma/
│   ├── schema.prisma              # Database schema (PostgreSQL)
│   ├── seed.ts                    # Seed script with 16 invitees
│   ├── init.sql                   # SQL for manual Postgres setup
│   ├── dev.db                     # Local SQLite (deprecated)
│   └── prisma.config.ts           # Prisma 7 configuration
├── public/
│   └── photos/                    # 5 custom party photos (PNG)
│       ├── photo-1.png (1.9 MB)
│       ├── photo-2.png (1.9 MB)
│       ├── photo-3.png (2.2 MB)
│       ├── photo-4.png (278 KB)
│       └── photo-5.png (2.1 MB)
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with fonts
│   │   ├── page.tsx               # Public homepage (guest list)
│   │   ├── globals.css            # Global styles, theme, animations
│   │   ├── not-found.tsx          # 404 page
│   │   ├── rsvp/
│   │   │   └── page.tsx           # Single RSVP page for all guests
│   │   ├── admin/
│   │   │   └── page.tsx           # Admin dashboard
│   │   ├── invite/[token]/        # Legacy personalized invite pages (still works)
│   │   │   ├── page.tsx
│   │   │   └── InvitePageClient.tsx
│   │   └── api/
│   │       ├── invitees/
│   │       │   ├── route.ts       # GET all invitees
│   │       │   └── [name]/
│   │       │       └── route.ts   # GET invitee by name
│   │       └── rsvp/
│   │           └── route.ts       # POST RSVP (name-based)
│   ├── components/
│   │   ├── AddToCalendar.tsx      # Calendar export options
│   │   ├── Carousel.tsx           # Swipeable photo carousel
│   │   ├── CastleGateOpening.tsx  # 3D castle gate animation
│   │   ├── EventDetails.tsx       # Event details card
│   │   ├── GuestList.tsx          # Who's coming list
│   │   ├── LocationBanner.tsx     # Horizontal date/time/location banner
│   │   ├── RSVPForm.tsx           # RSVP form (legacy, for /invite pages)
│   │   └── WaveDivider.tsx        # Decorative SVG wave divider
│   └── lib/
│       ├── calendar.ts            # ICS/Google/Outlook calendar generation
│       ├── config.ts              # Event configuration
│       └── prisma.ts              # Prisma client singleton
├── CUSTOM_INVITE_LINKS.md         # All 16 personalized invite links
├── DEPLOYMENT.md                  # Vercel deployment guide
├── README.md                      # User documentation
├── spec.md                        # This file (you are here)
├── .env.example                   # Environment variables template
└── package.json
```

---

## ✅ Completed Tasks

### 1. **Project Setup & Infrastructure**
- ✅ Scaffolded Next.js 16 project with TypeScript and Tailwind CSS 4
- ✅ Installed dependencies: Prisma, Framer Motion, Embla Carousel
- ✅ Set up Prisma with SQLite database
- ✅ Created database schema with `Invitee` model
- ✅ Configured Prisma 7 with better-sqlite3 adapter
- ✅ Set up Google Fonts (Cormorant Garamond + DM Sans)

### 2. **Database & Data Model**
- ✅ Designed `Invitee` table with fields:
  - `id`, `name`, `token` (for legacy support)
  - `adultsCount`, `kidsCount`, `maxKidsCount`
  - `isAttending` (boolean or null)
  - `message`, `respondedAt`, `createdAt`
- ✅ Created seed script for managing guest list
- ✅ Implemented name-based RSVP system (no personalized links required)
- ✅ **Custom URL system** with preset kid counts per invitee

### 3. **API Routes**
- ✅ `GET /api/invitees` - Fetch all RSVPs
- ✅ `GET /api/invitees/[name]` - Fetch specific invitee by name (for max kids lookup)
- ✅ `POST /api/rsvp` - Submit RSVP with name-based upsert logic and max kids validation

### 4. **Pages & User Experience**

#### **Homepage (`/`)**
- ✅ Hero section with party name and tagline
- ✅ Photo carousel
- ✅ Event details section
- ✅ "Who's Coming" guest list (real-time updates)
- ✅ Summary statistics (total adults, kids)
- ✅ "RSVP Now" call-to-action button

#### **RSVP Page (`/rsvp`)**
- ✅ Castle gate opening animation (3.5 seconds)
- ✅ Welcome message ("Welcome!" for generic, "Welcome, Name!" for custom links)
- ✅ Name input field
- ✅ **Custom URL support** with URL parameter (`?name=...`)
- ✅ **Database-driven max kids** - max count fetched from database, not URL
- ✅ **Pre-filled name field** (read-only when passed via URL)
- ✅ **Frozen kid counter** - plus button disabled when at max, can only decrease
- ✅ Yes/No attendance toggle
- ✅ Adult and kid counters
- ✅ Optional message field
- ✅ Submission with validation
- ✅ Thank you confirmation page
- ✅ Location banner (date, time, venue)
- ✅ Swipeable photo carousel
- ✅ Wrapped in Suspense for proper useSearchParams support

#### **Admin Dashboard (`/admin`)**
- ✅ Summary cards: Going, Not Going, Pending, Total Adults, Total Kids
- ✅ Full RSVP table with:
  - Guest names
  - Status badges (color-coded)
  - Adult/kid counts
  - Messages
  - Timestamps
- ✅ Quick links to public page and RSVP page
- ✅ Responsive table design

### 5. **Design & Animations**

#### **Visual Design**
- ✅ Scandinavian minimalism meets whimsical theme
- ✅ Color palette: lavender, seafoam, rose gold, charcoal
- ✅ Custom gradient backgrounds
- ✅ Floating emoji decorations
- ✅ Wave-shaped SVG section dividers
- ✅ Soft shadows and backdrop blur effects

#### **Animations**
- ✅ Castle gate 3D flip animation
- ✅ Sparkle burst effect
- ✅ Text shimmer animation
- ✅ Floating emoji animations
- ✅ Smooth page transitions with Framer Motion
- ✅ Form field reveal animations

### 6. **Mobile Optimization**
- ✅ Touch-optimized controls (44px minimum targets)
- ✅ Swipeable carousel with smooth gestures
- ✅ Responsive text sizing (sm/md/lg breakpoints)
- ✅ No tap highlights
- ✅ Proper touch-action declarations
- ✅ Fast-loading with lazy image loading
- ✅ Active scale effects on button press

### 7. **Calendar Integration**
- ✅ Add to Calendar functionality (Google, Apple, Outlook)
- ✅ ICS file generation
- ✅ Event parsing from config
- ✅ Post-RSVP calendar options

### 8. **Content & Configuration**
- ✅ Event details in `src/lib/config.ts`:
  - Party name: "Mila and Lia's 5th Birthday Celebration"
  - Date: Sunday, March 22, 2026
  - Time: 1:00 PM – 3:00 PM
  - Venue: La Petite Playhouse
  - Address: 1264 Oddstad Dr, Redwood City, CA 94063
- ✅ Custom theme description
- ✅ 5 custom photos integrated
- ✅ Multi-theme tagline with line break

### 9. **Git & Deployment**
- ✅ Initialized Git repository
- ✅ Committed all code
- ✅ Pushed to GitHub: https://github.com/skyspeak/birthday
- ✅ .gitignore properly configured

### 10. **Custom URL System (February 12, 2026)**
- ✅ Added `maxKidsCount` field to database schema
- ✅ Implemented URL parameter handling (`?name=...`)
- ✅ Database-driven max kids count (not passed in URL)
- ✅ Created `/api/invitees/[name]` endpoint to fetch invitee data
- ✅ Pre-filled and read-only name field for custom URLs
- ✅ Frozen kid counter - plus button disabled when at max
- ✅ API validation to prevent exceeding preset kid limits
- ✅ Generated 16 custom invite links (see `CUSTOM_INVITE_LINKS.md`)
- ✅ Wrapped page in Suspense for proper Next.js App Router support
- ✅ Seeded database with all 16 invitees and their max kids counts

### 11. **PostgreSQL Migration & Vercel Deployment (February 12, 2026)**
- ✅ Migrated from SQLite to PostgreSQL for production persistence
- ✅ Installed `@prisma/adapter-pg` and `pg` packages
- ✅ Updated Prisma schema to use `postgresql` provider
- ✅ Configured Prisma client to use PrismaPg adapter
- ✅ Set up Prisma Postgres database on Vercel
- ✅ Pushed database schema to production using `prisma db push`
- ✅ Seeded production database with 16 invitees
- ✅ Deployed to Vercel: https://birthday-invite-lovat.vercel.app
- ✅ Configured environment variables in Vercel
- ✅ Verified RSVP submissions work in production
- ✅ Admin dashboard live and tracking RSVPs
- ✅ All 16 custom invite links ready to share

---

## 📋 Configuration Summary

### Event Details (`src/lib/config.ts`)

```typescript
partyName: "Mila and Lia's 5th Birthday Celebration"
childName: "Mila & Lia"
childAge: 5
tagline: "A Cat / Mermaid / Unicorn / Dog Celebration\n(we couldn't agree on a theme)"
date: "Sunday, March 22, 2026"
time: "1:00 PM – 3:00 PM"
venueName: "La Petite Playhouse"
address: "1264 Oddstad Dr, Redwood City, CA 94063"
```

### Photos

5 custom images in `public/photos/`:
- All integrated into carousel
- Swipeable on mobile and desktop
- Lazy loading enabled

### Database

- **Type:** PostgreSQL (Prisma Postgres via Vercel)
- **Production:** Hosted on Vercel (persistent storage)
- **Current State:** 16 invitees pre-populated with max kids counts, no RSVPs yet
- **Schema:** Single `Invitee` table with `maxKidsCount` field
- **Connection:** Via `POSTGRES_URL` and `POSTGRES_PRISMA_URL` environment variables

---

## 🔗 Key URLs

### Production (LIVE)
- **Public Homepage:** https://birthday-invite-lovat.vercel.app
- **RSVP Link (Generic):** https://birthday-invite-lovat.vercel.app/rsvp
- **Custom Invite Links:** See `CUSTOM_INVITE_LINKS.md` for all 16 personalized links
- **Admin Dashboard:** https://birthday-invite-lovat.vercel.app/admin
- **GitHub Repository:** https://github.com/skyspeak/birthday

### Local Development
- **Public Homepage:** http://localhost:3000
- **RSVP Link:** http://localhost:3000/rsvp
- **Admin Dashboard:** http://localhost:3000/admin

---

## 🎯 Ready to Share!

### ✅ All Systems Go

1. **Production Testing Complete**
   - ✅ Tested RSVP submissions on production
   - ✅ Verified admin dashboard displays data correctly
   - ✅ Confirmed custom links work with preset kid limits
   - ✅ Validated frozen kid counter functionality
   - ✅ Tested on multiple devices

2. **Customization Complete**
   - ✅ Event details configured in `src/lib/config.ts`
   - ✅ Date, time, and address confirmed
   - ✅ 5 party photos integrated
   - ✅ Multi-theme tagline finalized

3. **Production Deployment Complete**
   - ✅ Hosted on Vercel: https://birthday-invite-lovat.vercel.app
   - ✅ PostgreSQL database live with 16 invitees
   - ✅ Environment variables configured
   - ✅ Build and deployment successful
   - ✅ GitHub repository updated

### Next Steps for Party Hosts

1. **Share Custom Invite Links**
   - All 16 personalized links in `CUSTOM_INVITE_LINKS.md`
   - Each link enforces preset kid limits
   - Send via email, text, or messaging app
   - Consider using URL shorteners for cleaner sharing

2. **Monitor RSVPs**
   - Check admin dashboard: https://birthday-invite-lovat.vercel.app/admin
   - Bookmark the admin URL for quick access
   - RSVPs appear in real-time
   - Track who's coming, dietary notes, and total counts

3. **Share Public Page**
   - Homepage shows who's coming: https://birthday-invite-lovat.vercel.app
   - Guests can see the party details and guest list
   - Updates automatically as RSVPs come in

4. **Follow-up Actions**
   - Send reminders to pending guests
   - Plan food/supplies based on final counts
   - Contact guests with special requests or dietary restrictions

### Optional Enhancements

If time permits, consider adding:

- [ ] **Email notifications** when someone RSVPs (using SendGrid, Resend, etc.)
- [ ] **Export to CSV** button on admin page
- [ ] **Edit/delete RSVP** functionality in admin
- [ ] **Password protection** for admin page (simple auth)
- [ ] **Custom domain** setup
- [ ] **Analytics** to track page views
- [ ] **Print view** for admin page
- [ ] **QR code** generator for easy RSVP link sharing

---

## 🛠️ Maintenance & Updates

### To Add More Photos

1. Drop new images in `public/photos/`
2. Update `src/lib/config.ts`:
   ```typescript
   photos: [
     "/photos/photo-1.png",
     "/photos/photo-2.png",
     "/photos/new-photo.png",
   ]
   ```
3. Commit and push to GitHub (auto-deploys to Vercel)

### To Update Event Details

Edit `src/lib/config.ts`, commit, and push - changes deploy automatically.

### To View RSVP Data

```bash
# Via Production API
curl https://birthday-invite-lovat.vercel.app/api/invitees | jq

# Via Admin Page (Recommended)
# Visit https://birthday-invite-lovat.vercel.app/admin
```

### To Clear All RSVPs (Keep Invitees)

```bash
# Connect to production database and run:
npx prisma db push --url="your-postgres-url"

# Then update all RSVPs to null
# (Best done via SQL in Vercel dashboard)
```

### To Add New Invitees

1. Update `prisma/seed.ts` with new invitee names and max kids
2. Run seed script with production database:
   ```bash
   export $(cat .env.local | grep POSTGRES_URL | xargs)
   npx tsx prisma/seed.ts
   ```

---

## 📱 User Journeys

### Guest Journey (Custom Link)

1. Receive personalized RSVP link: `https://birthday-invite-lovat.vercel.app/rsvp?name=Niko`
2. Open link on mobile or desktop
3. Watch castle gate opening animation (3.5s) with personalized greeting
4. See party name, tagline, and location banner
5. Notice name is **pre-filled and locked**
6. Fill out RSVP form:
   - Name is read-only (pre-filled)
   - Select "We'll be there!" or "Can't make it"
   - Kids counter starts at max allowed (1 or 2)
   - Plus button is disabled (can only decrease)
   - Set adult count
   - Add optional message
7. Submit RSVP (validated against database max)
8. See personalized confirmation page
9. Optionally add event to calendar
10. Visit public page to see who else is coming

### Host Journey

1. Share 16 custom links (one per invitee/family)
2. Monitor RSVPs at `/admin`:
   - See summary stats (going, not going, pending)
   - View detailed table with max kids column
   - Check messages from guests
   - Track total adults and kids count
3. Plan party based on final counts
4. Visit public page to see guest-facing view
5. Send follow-ups to pending invitees

---

## 🎨 Design System

### Color Palette

```css
--color-lavender: #C4A7D7  /* Primary accent - unicorn magic */
--color-seafoam: #88C9BF   /* Secondary accent - mermaid ocean */
--color-rose: #E8C4C4      /* Tertiary accent - soft pink */
--color-gold: #D4C5A9      /* Pending state - pale gold */
--color-charcoal: #2D2D2D  /* Text color */
--color-cream: #FAFAFA     /* Background base */
```

### Typography

- **Headings:** Cormorant Garamond (serif) - elegant, fairy-tale feel
- **Body:** DM Sans (sans-serif) - clean, readable

### Animation Timing

- **Castle gates opening:** 1.2s (easeInOut)
- **Sparkles burst:** 2s staggered
- **Welcome sign:** 0.6s spring bounce
- **Total animation:** 3.5s (plays once per session)
- **Page transitions:** 0.3-0.8s with Framer Motion

### Responsive Breakpoints

- **sm:** 640px (small tablets)
- **md:** 768px (tablets)
- **lg:** 1024px (desktops)

---

## 📦 Dependencies

### Production
```json
{
  "@prisma/adapter-pg": "^7.4.0",
  "@prisma/client": "^7.4.0",
  "embla-carousel-autoplay": "^8.6.0",
  "embla-carousel-react": "^8.6.0",
  "framer-motion": "^12.34.0",
  "next": "16.1.6",
  "pg": "^8.18.0",
  "prisma": "^7.4.0",
  "react": "19.2.3",
  "react-dom": "19.2.3"
}
```

### Development
```json
{
  "@types/pg": "^8.11.10",
  "tsx": "^4.21.0",
  "ts-node": "^10.9.2",
  "typescript": "^5",
  "tailwindcss": "^4"
}
```

---

## 🔒 Security & Privacy

### Current Setup
- **No authentication** on any pages
- **Public access** to homepage and RSVP page
- **Admin page accessible** via hidden URL (no password)
- **Database:** Managed PostgreSQL on Vercel (secure, encrypted)
- **Environment variables:** Stored securely in Vercel (not in code)
- **Max kids validation:** Enforced at both UI and API level

### Considerations
- Admin page is accessible to anyone with the URL
- For low-traffic personal events, this is acceptable
- Database credentials are never exposed in frontend code
- All database connections use SSL (sslmode=require)

---

## 🚀 Deployment Status

### ✅ Production Deployment Complete

- ✅ Deployed to Vercel: https://birthday-invite-lovat.vercel.app
- ✅ PostgreSQL database configured and seeded
- ✅ Environment variables set in Vercel
- ✅ Build successful (npm run build passes)
- ✅ All images load correctly
- ✅ RSVP submission tested and working
- ✅ Admin dashboard live and functional
- ✅ Custom invite links ready to share
- ✅ HTTPS configured (automatic on Vercel)

### Deployment Architecture

**Build Process:**
1. `prisma generate` - Generates Prisma client for PostgreSQL
2. `next build` - Compiles Next.js app (Turbopack)
3. Environment variables injected at runtime
4. Serverless functions created for API routes

**Runtime Environment:**
- Node.js 20+ on Vercel serverless functions
- PostgreSQL connection via `@prisma/adapter-pg`
- Connection pooling handled by `pg` package
- SSL-encrypted database connections

---

## 📊 Current Database State

**Status:** ✅ Production Database Live with 16 Invitees

**Database Type:** PostgreSQL (Prisma Postgres via Vercel)

**Schema:**
```prisma
model Invitee {
  id           Int       @id @default(autoincrement())
  name         String
  token        String    @unique @default(uuid())
  adultsCount  Int       @default(0)
  kidsCount    Int       @default(0)
  maxKidsCount Int?                    // ← NEW: Preset max kids allowed
  isAttending  Boolean?
  message      String?
  respondedAt  DateTime?
  createdAt    DateTime  @default(now())
}
```

**Current Data:**
- 16 invitees pre-populated with preset max kids counts
- 4 invitees with maxKidsCount = 2
- 12 invitees with maxKidsCount = 1
- No RSVP responses yet (ready for guests)

---

## 🎉 Key Features Implemented

### 1. Castle Gate Opening Animation
- **Duration:** 3.5 seconds
- **Elements:**
  - Two castle towers with waving flags (🧜‍♀️ 🦄)
  - Giant gates with 3D flip animation
  - Decorative emojis on gates (🐱 🐶)
  - Sparkle burst effect (12 sparkles)
  - Welcome sign with personalized greeting
  - Bouncing theme emojis (🐱 🧜‍♀️ 🦄 🐶)
- **Behavior:** Plays once per session (uses sessionStorage)

### 2. Custom URL System
- **Personalized links** - Each invitee gets a unique URL with their name
- **Database-driven max kids** - Max count stored in database, not URL
- **Name pre-filled** - Name field is read-only for custom links
- **Frozen kid counter** - Plus button disabled, can only decrease
- **URL format:** `?name=Guest%20Name` (max kids fetched from database)
- **16 unique links** - See `CUSTOM_INVITE_LINKS.md`

### 3. Photo Carousel
- **5 custom photos** from `public/photos/`
- **Swipeable:** Touch/mouse drag enabled
- **Autoplay:** 4-second intervals (pauses on interaction)
- **Responsive:** Aspect ratio changes on mobile (16:9) vs desktop (21:9)
- **Loop enabled:** Infinite scrolling

### 4. Location Banner
- **Horizontal layout** with date, time, and venue
- **Clickable map link** - Opens Google Maps
- **Responsive:** Stacks vertically on mobile
- **Icons:** Calendar and location pin icons

### 5. Admin Dashboard
- **Summary stats** in colored cards
- **Detailed table** with sorting and filtering
- **Responsive:** Hides less critical columns on mobile
- **Real-time updates** - Refreshes when guests RSVP

---

## 📝 Notes & Known Behaviors

### Session Storage
- Castle gate animation uses `sessionStorage.setItem('castle-gate-opened', 'true')`
- Animation skips on reload within same session
- To test again: Clear session storage in browser console

### Name Matching
- Case-sensitive exact match
- Trailing/leading spaces trimmed
- If same name submits twice, RSVP is updated (not duplicated)

### Legacy Support
- Old `/invite/[token]` routes still work (for backwards compatibility)
- Not actively used but can be re-enabled if needed

### Database
- **Production:** PostgreSQL (Prisma Postgres) - persistent, managed by Vercel
- **Backup:** Automatic backups by Vercel (no manual backup needed)
- **Seeding:** Run `npx tsx prisma/seed.ts` with env vars set
- **Schema Updates:** Use `npx prisma db push --url="..."` to push schema changes

---

## 🐛 Troubleshooting

### Dev Server Won't Start
```bash
pkill -f "next dev"
rm -rf .next
npm run dev
```

### Database Connection Issues
```bash
# Verify environment variables are set
cat .env.local | grep POSTGRES

# Regenerate Prisma client
npx prisma generate

# Test database connection
npx tsx prisma/seed.ts
```

### Build Errors
```bash
# Clear build cache
rm -rf .next

# Regenerate Prisma client
npx prisma generate

# Test build
npm run build
```

### Prisma Schema/Adapter Mismatch
- Make sure `prisma/schema.prisma` uses `provider = "postgresql"`
- Ensure `src/lib/prisma.ts` uses `PrismaPg` adapter for Postgres
- Run `npx prisma generate` after schema changes

### Photos Not Loading
- Check file names in `src/lib/config.ts` match files in `public/photos/`
- Ensure photos are PNG/JPG format
- Verify photos are committed to Git (Vercel deploys from Git)

---

## 💡 Tips & Best Practices

1. **Before sharing the link:**
   - Test the full RSVP flow yourself
   - Clear test data: `rm prisma/dev.db && npx prisma db push`
   - Verify event details are correct

2. **During the event:**
   - Keep `/admin` bookmarked for easy access
   - Check new RSVPs regularly
   - Share public homepage so guests can see who's coming

3. **After the event:**
   - Save RSVP data for records
   - Download photos from carousel for memories
   - Keep GitHub repo as a template for future parties

---

## 🎯 Custom URL System (Database-Driven)

### Overview

The birthday invite app uses a sophisticated custom URL system where each invitee gets a personalized link. The maximum number of kids is stored in the database and enforced at both the UI and API level.

### Architecture

1. **URL Parameters:**
   - `name`: The invitee's name (URL encoded)
   - Example: `https://birthday-invite-lovat.vercel.app/rsvp?name=Samuel%20%26%20Miriam`

2. **Database Lookup:**
   - When page loads with `?name=...`, it fetches invitee data from `/api/invitees/[name]`
   - Returns `maxKidsCount` from database
   - Page automatically configures UI based on database value

3. **UI Behavior:**
   - Name field is **pre-filled and read-only** (grayed out)
   - Kids counter **starts at the maximum** allowed (from database)
   - **Plus (+) button is disabled** when at max capacity
   - **Minus (-) button works** normally to reduce the count
   - User cannot exceed their preset maximum

4. **API Validation:**
   - Backend validates submitted kid count against database `maxKidsCount`
   - Returns 400 error if validation fails
   - Preserves `maxKidsCount` on updates (doesn't overwrite)

### Custom Links

All 16 custom invite links are in `CUSTOM_INVITE_LINKS.md`:

**2 kids allowed (4 invitees):**
- Samuel & Miriam
- Khai and Liem
- Adam & Kelley
- Cody & Annie

**1 kid allowed (12 invitees):**
- Niko, Lennon, Mila, Nyla, Sydney, Xenia, Summer, Maya, Aria, Celine, Leili, Clara

### Key Learnings

**Why Database-Driven (Not URL Parameters):**
- ✅ **More secure** - Can't tamper with max kids by editing URL
- ✅ **Cleaner URLs** - Shorter, more professional links
- ✅ **Centralized control** - Update max counts in one place (database)
- ✅ **Flexible** - Can adjust limits without regenerating URLs
- ✅ **Auditable** - Max kids count stored with each RSVP record

---

## 🎊 Success Metrics

The app is **production-ready** when:
- ✅ Castle gate animation plays smoothly
- ✅ RSVP form submits successfully
- ✅ Guest list updates in real-time
- ✅ Admin dashboard shows accurate stats
- ✅ Mobile experience is smooth
- ✅ Photos load and carousel swipes properly
- ✅ Calendar export works

**Current Status:** ✅ **ALL READY**

---

## 🙏 Credits

**Built with:**
- Next.js 16 by Vercel
- Prisma ORM
- Tailwind CSS
- Framer Motion
- Embla Carousel

**Design Inspiration:**
- Scandinavian minimalism
- Whimsical fairy-tale aesthetics
- Modern web design best practices

---

---

## 🎓 Key Technical Learnings

### Prisma 7 with PostgreSQL on Vercel

1. **Adapter Requirement:** Prisma 7 requires database adapters
   - Use `@prisma/adapter-pg` for PostgreSQL
   - Use `PrismaPg` with `pg.Pool` for connection
   - Schema provider must match adapter type

2. **Environment Variable Priority:**
   - `POSTGRES_URL` - Direct connection string
   - `POSTGRES_PRISMA_URL` - Prisma Accelerate URL (has `prisma+` prefix)
   - Strip `prisma+` prefix when using with `pg.Pool`

3. **Database Setup on Vercel:**
   - Add Postgres via Vercel Storage tab
   - Environment variables auto-added to project
   - Push schema: `npx prisma db push --url="..."`
   - Seed database: `npx tsx prisma/seed.ts` (with env vars)

4. **Build Considerations:**
   - Prisma client must be generated at build time (`postinstall` script)
   - Schema provider must match production database
   - Can't use SQLite schema with Postgres adapter
   - `prisma.config.ts` needs correct datasource URL priority

5. **Deployment Flow:**
   ```bash
   # Link to Vercel project
   npx vercel link --yes
   
   # Deploy to production
   npx vercel --prod
   
   # Pull environment variables locally
   npx vercel env pull .env.local
   ```

### URL Parameter Best Practices

- **Security:** Store sensitive data (like limits) in database, not URLs
- **Simplicity:** Shorter URLs are easier to share
- **Flexibility:** Database-driven allows changes without regenerating links
- **Validation:** Always validate on backend, never trust client-side only

### Next.js App Router Patterns

- Use `Suspense` wrapper when components call `useSearchParams()`
- URL parameters trigger client-side data fetching
- API routes run server-side with full database access
- Static pages can be pre-rendered, dynamic routes render on-demand

---

**Project Status:** ✅ **DEPLOYED & LIVE IN PRODUCTION**  
**Production URL:** https://birthday-invite-lovat.vercel.app  
**Admin Dashboard:** https://birthday-invite-lovat.vercel.app/admin  
**Ready to Share:** Yes - All 16 custom links ready!  

Made with ✨ for Mila & Lia's magical 5th birthday celebration!
