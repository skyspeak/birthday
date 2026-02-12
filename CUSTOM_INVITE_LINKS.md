# Custom Birthday Invite Links

Each link is personalized with the invitee's name. The maximum number of kids allowed is stored in the database and automatically enforced.

## Important Notes:
- The name field will be **pre-filled and read-only**
- The max kids count is **stored in the database** (not in the URL)
- The kids counter will **start at the maximum** allowed
- Invitees can only **decrease** the number of kids (minus button works)
- The **plus button is disabled** to prevent exceeding the preset maximum

---

## Invite Links

### Samuel & Miriam (2 kids max)
```
http://localhost:3000/rsvp?name=Samuel%20%26%20Miriam
```

### Khai and Liem (2 kids max)
```
http://localhost:3000/rsvp?name=Khai%20and%20Liem
```

### Adam & Kelley (2 kids max)
```
http://localhost:3000/rsvp?name=Adam%20%26%20Kelley
```

### Cody & Annie (2 kids max)
```
http://localhost:3000/rsvp?name=Cody%20%26%20Annie
```

### Niko (1 kid max)
```
http://localhost:3000/rsvp?name=Niko
```

### Lennon (1 kid max)
```
http://localhost:3000/rsvp?name=Lennon
```

### Mila (1 kid max)
```
http://localhost:3000/rsvp?name=Mila
```

### Nyla (1 kid max)
```
http://localhost:3000/rsvp?name=Nyla
```

### Sydney (1 kid max)
```
http://localhost:3000/rsvp?name=Sydney
```

### Xenia (1 kid max)
```
http://localhost:3000/rsvp?name=Xenia
```

### Summer (1 kid max)
```
http://localhost:3000/rsvp?name=Summer
```

### Maya (1 kid max)
```
http://localhost:3000/rsvp?name=Maya
```

### Aria (1 kid max)
```
http://localhost:3000/rsvp?name=Aria
```

### Celine (1 kid max)
```
http://localhost:3000/rsvp?name=Celine
```

### Leili (1 kid max)
```
http://localhost:3000/rsvp?name=Leili
```

### Clara (1 kid max)
```
http://localhost:3000/rsvp?name=Clara
```

---

## For Production Deployment

When you deploy to production, replace `http://localhost:3000` with your production URL. For example:

```
https://your-app.vercel.app/rsvp?name=Samuel%20%26%20Miriam
```

## Testing

To test the functionality:

1. Start the dev server: `npm run dev`
2. Click on any of the links above
3. Verify that:
   - The name field is pre-filled and cannot be edited
   - The kids counter starts at the maximum allowed (from database)
   - The plus (+) button is disabled/grayed out
   - The minus (-) button works to decrease the count
   - The RSVP submits successfully

## Database Setup

The invitees with their max kids counts are pre-populated in the database. To reseed the database:

```bash
npx tsx prisma/seed.ts
```

This will create/update all 16 invitees with their preset maximum kid counts.

## URL Parameter Reference

- `name` - The invitee's name (URL encoded)

Example: `?name=John%20Doe`

The maximum kids count is stored in the database and automatically retrieved when the RSVP page loads.
