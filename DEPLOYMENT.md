# Deployment Guide for Vercel

## Initial Setup

1. **Deploy to Vercel via GitHub:**
   - Go to https://vercel.com/new
   - Sign in with GitHub
   - Import repository: `skyspeak/birthday`
   - Click "Deploy"

2. **Add Vercel Postgres Database:**
   - After deployment, go to your project dashboard
   - Click the "Storage" tab
   - Click "Create Database"
   - Select "Postgres"
   - Name it (e.g., `birthday-rsvp-db`)
   - Click "Create"
   - Vercel automatically adds environment variables:
     - `POSTGRES_PRISMA_URL`
     - `POSTGRES_URL_NON_POOLING`

3. **Initialize Database Schema:**
   
   After the database is created, you need to create the schema and seed the data.
   
   **Step 3a: Create Tables**
   
   Go to Vercel Dashboard → Storage → Your Database → Query tab
   
   Copy and paste the entire contents of `prisma/init.sql` into the query box and click "Run".
   
   This will create the `Invitee` table with all required columns.
   
   **Step 3b: Seed the Database**
   
   ```bash
   # Pull environment variables from Vercel
   npx vercel env pull .env.local
   
   # Seed the database (will connect to Vercel Postgres)
   npx tsx prisma/seed.ts
   ```
   
   This will populate your database with all 16 invitees and their preset max kids counts.
   
   **Option B: Using Vercel Dashboard**
   
   Go to your project on Vercel:
   1. Click "Settings" → "Functions"
   2. Add a one-time function to run:
      ```
      npx prisma db push && npx tsx prisma/seed.ts
      ```
   
   **Option C: Manual via Connection String**
   
   1. Copy the `POSTGRES_PRISMA_URL` from Vercel dashboard
   2. Run locally:
      ```bash
      POSTGRES_PRISMA_URL="your-connection-string" npx prisma db push
      POSTGRES_PRISMA_URL="your-connection-string" npx tsx prisma/seed.ts
      ```

4. **Redeploy:**
   - Go to "Deployments" tab
   - Click the 3 dots menu on latest deployment
   - Click "Redeploy"

## Database Schema

The schema will automatically create:
- 16 pre-configured invitees with their max kids count
- Empty RSVP responses (ready for guests to submit)

## Custom Invite Links

All custom links are in `CUSTOM_INVITE_LINKS.md`. Update the base URL:

```
http://localhost:3000  →  https://your-app.vercel.app
```

## Environment Variables

The app automatically detects the environment:
- **Local:** Uses SQLite (`prisma/dev.db`)
- **Production:** Uses Vercel Postgres (via `POSTGRES_PRISMA_URL`)

No additional configuration needed!

## Troubleshooting

### Build fails with "datasource.url is required"
- This means you're trying to run migrations before the database exists
- Solution: Deploy first, add database second, then run schema push

### Database is empty after deployment
- Run the seed command to populate invitees:
  ```bash
  npx tsx prisma/seed.ts
  ```

### RSVPs not persisting
- Make sure Vercel Postgres is connected
- Check environment variables in Vercel dashboard
- Verify `POSTGRES_PRISMA_URL` is set
