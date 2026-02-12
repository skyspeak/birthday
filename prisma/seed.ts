import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "dev.db");

const adapter = new PrismaBetterSqlite3({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

// =============================================
// ADD YOUR GUEST NAMES HERE (Optional)
// =============================================
// Note: Guests can also RSVP directly at /rsvp without being pre-added
const guests = [
  "Alice Johnson",
  "Bob & Maria Smith",
  "The Garcia Family",
  "Emma Wilson",
  "The Andersons",
];

async function main() {
  console.log("\n🧜‍♀️🦄 Birthday Party RSVP Manager\n");

  if (guests.length > 0) {
    console.log("Pre-adding guests to the database...\n");

    for (const name of guests) {
      const existing = await prisma.invitee.findFirst({
        where: { name },
      });

      if (existing) {
        console.log(`  ⏭  "${name}" already exists, skipping.`);
      } else {
        await prisma.invitee.create({
          data: { name },
        });
        console.log(`  ✅ Created "${name}"`);
      }
    }
  }

  console.log("\n─────────────────────────────────────────────────");
  console.log("  RSVP Link:");
  console.log("─────────────────────────────────────────────────\n");
  console.log("  Share this link with all your guests:\n");
  console.log("  🔗 http://localhost:3000/rsvp\n");
  console.log("─────────────────────────────────────────────────\n");

  const allInvitees = await prisma.invitee.findMany({
    orderBy: { createdAt: "asc" },
  });

  console.log(`Total guests: ${allInvitees.length}\n`);

  if (allInvitees.length > 0) {
    const going = allInvitees.filter((i) => i.isAttending === true);
    const notGoing = allInvitees.filter((i) => i.isAttending === false);
    const pending = allInvitees.filter((i) => i.isAttending === null);

    console.log(`  ✅ Going: ${going.length}`);
    console.log(`  ❌ Not going: ${notGoing.length}`);
    console.log(`  ⏳ Pending: ${pending.length}\n`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
