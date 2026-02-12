# 🧜‍♀️🦄 Birthday Party RSVP App

A beautifully designed, mobile-optimized birthday party invitation and RSVP website with castle gate opening animation and a whimsical multi-theme celebration.

## ✨ Features

- **Animated castle gate opening** - Guests are greeted with a magical 3D castle animation with flipping gates, waving flags, sparkles, and a humorous welcome message
- **Single RSVP link** - One link for all guests (no need for personalized invites)
- **Beautiful photo carousel** - Swipeable gallery with your party photos
- **Mobile-first responsive design** - Optimized for all devices
- **Seamless RSVP experience** - Name entry, adults/kids counters, and optional message
- **Public guest list** - Shows who's coming, who can't make it, and pending replies
- **Whimsical multi-theme design** - Cat / Mermaid / Unicorn / Dog celebration with elegant animations

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up the Database

```bash
npx prisma db push
```

### 3. Customize Event Details

Edit `src/lib/config.ts`:

```typescript
export const eventConfig = {
  partyName: "Your Child's Birthday",
  childName: "Your Child",
  date: "Sunday, March 22, 2026",
  time: "1:00 PM – 3:00 PM",
  venueName: "Your Venue",
  address: "123 Your Street, Your City",
  // ... more options
};
```

### 4. Add Your Photos

Drop your photos in `public/photos/` and update `src/lib/config.ts`:

```typescript
photos: [
  "/photos/photo-1.png",
  "/photos/photo-2.png",
  "/photos/photo-3.png",
  "/photos/photo-4.png",
  "/photos/photo-5.png",
];
```

### 5. Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 6. Share the RSVP Link

Send this single link to all your guests:

**🔗 http://localhost:3000/rsvp**

That's it! No need to generate individual links for each guest.

## 📱 Mobile Optimization

The app is **fully optimized for mobile devices** with:

- **Touch-optimized controls** (44px minimum touch targets)
- **Swipeable carousel** - Smooth touch gestures on mobile and desktop
- **Responsive text sizes** that scale beautifully on all screens
- **No accidental taps** (tap highlight removed)
- **Fast-loading images** with lazy loading
- **Adaptive layouts** that work on phones, tablets, and desktops

## 🏰 Castle Gate Opening Animation

When guests visit the RSVP link, they're greeted with a **magical castle gate animation**:

- **3D castle gates** that flip open smoothly (1.2 seconds)
- **Two towers** with waving flags (mermaid & unicorn)
- **Sparkles burst** from the center as gates open
- **Welcome sign** springs in with personalized greeting
- **Funny theme text**: "Welcome to the cat / mermaid / unicorn / dog Birthday party (we couldn't agree on a common theme)"
- **Bouncing emojis** (🐱 🧜‍♀️ 🦄 🐶) add playfulness

**Smart behavior:**
- Plays once per session (3.5 seconds total)
- Uses `sessionStorage` to prevent repetition
- Skips animation on subsequent visits in the same browser session

## 🎯 How It Works

### For Guests:
1. Visit **http://localhost:3000/rsvp**
2. Watch the castle gate animation
3. Enter their name
4. Select "We'll be there!" or "Can't make it"
5. If attending, set number of adults and kids
6. Optionally add a message
7. Click "Send RSVP"

### For You (The Host):
1. Visit **http://localhost:3000** to see the public guest list
2. Visit **http://localhost:3000/admin** for the detailed admin dashboard with:
   - Summary stats (going, not going, pending, total adults, total kids)
   - Full RSVP table with names, status, counts, messages, and timestamps
   - Quick links to public page and RSVP page
3. Share the single RSVP link with everyone

## 📁 Project Structure

```
birthday-invite/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Optional: pre-add guest names
├── public/
│   └── photos/                # Your party photos
├── src/
│   ├── app/
│   │   ├── page.tsx           # Homepage (public guest list)
│   │   ├── rsvp/
│   │   │   └── page.tsx       # RSVP page (single link for all)
│   │   ├── admin/
│   │   │   └── page.tsx       # Admin dashboard with detailed RSVP table
│   │   ├── api/
│   │   │   ├── invitees/      # GET all invitees
│   │   │   └── rsvp/          # POST RSVP responses
│   │   └── globals.css        # Global styles & theme
│   ├── components/
│   │   ├── CastleGateOpening.tsx  # Castle animation
│   │   ├── Carousel.tsx           # Photo carousel
│   │   ├── LocationBanner.tsx     # Date/time/location banner
│   │   ├── GuestList.tsx          # Who's coming list
│   │   └── WaveDivider.tsx        # Decorative wave SVG
│   └── lib/
│       ├── config.ts          # Event details (edit this!)
│       └── prisma.ts          # Database client
└── README.md
```

## 🛠️ Tech Stack

- **Next.js 16** (App Router) - React framework
- **Prisma 7** + **SQLite** - Database ORM and file-based DB
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Embla Carousel** - Touch-optimized swipeable carousel
- **TypeScript** - Type safety

## 🎨 Design Customization

### Colors

Edit `src/app/globals.css` to change the color palette:

```css
@theme {
  --color-lavender: #C4A7D7;  /* Primary accent */
  --color-seafoam: #88C9BF;   /* Secondary accent */
  --color-rose: #E8C4C4;      /* Tertiary accent */
  --color-gold: #D4C5A9;      /* Pending state */
  --color-charcoal: #2D2D2D;  /* Text */
  --color-cream: #FAFAFA;     /* Background */
}
```

### Photos

The carousel is **fully swipeable**:
- **Desktop**: Click and drag left/right
- **Mobile**: Swipe with your finger
- **Both**: Click dots below to jump to any photo

## 🎯 Common Tasks

### Pre-add Guest Names (Optional)

If you want guests to see their names already in the system, edit `prisma/seed.ts`:

```typescript
const guests = [
  "Alice Johnson",
  "Bob & Maria Smith",
  "The Garcia Family",
  // Add your guests here...
];
```

Then run:

```bash
npx prisma db seed
```

**Note:** This is optional. Guests can RSVP even if their names aren't pre-added.

### View All RSVPs

Visit the homepage at **http://localhost:3000** to see:
- Who's coming (with adult/kid counts)
- Who can't make it
- Who hasn't responded yet
- Total adult and kid counts

### Reset the Database

```bash
rm prisma/dev.db
npx prisma db push
```

## 🎉 Tips for Success

1. **Test the RSVP flow** before sharing the link
2. **Share one link with everyone**: http://localhost:3000/rsvp
3. **Check on mobile** - most guests will RSVP from their phones
4. **Customize the photos** to match your party theme
5. **Update the config** with accurate date/time/location

---

Made with ✨ for magical birthday celebrations
