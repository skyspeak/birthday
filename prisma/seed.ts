import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");
const adapter = new PrismaBetterSqlite3({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database with invitees...");

  const invitees = [
    { name: "Samuel & Miriam", maxKidsCount: 2 },
    { name: "Khai and Liem", maxKidsCount: 2 },
    { name: "Adam & Kelley", maxKidsCount: 2 },
    { name: "Cody & Annie", maxKidsCount: 2 },
    { name: "Niko", maxKidsCount: 1 },
    { name: "Lennon", maxKidsCount: 1 },
    { name: "Mila", maxKidsCount: 1 },
    { name: "Nyla", maxKidsCount: 1 },
    { name: "Sydney", maxKidsCount: 1 },
    { name: "Xenia", maxKidsCount: 1 },
    { name: "Summer", maxKidsCount: 1 },
    { name: "Maya", maxKidsCount: 1 },
    { name: "Aria", maxKidsCount: 1 },
    { name: "Celine", maxKidsCount: 1 },
    { name: "Leili", maxKidsCount: 1 },
    { name: "Clara", maxKidsCount: 1 },
  ];

  for (const invitee of invitees) {
    const existing = await prisma.invitee.findFirst({
      where: { name: invitee.name },
    });

    if (existing) {
      // Update existing invitee to set maxKidsCount if not already set
      await prisma.invitee.update({
        where: { id: existing.id },
        data: { maxKidsCount: invitee.maxKidsCount },
      });
      console.log(`✅ Updated: ${invitee.name} (max ${invitee.maxKidsCount} kids)`);
    } else {
      // Create new invitee
      await prisma.invitee.create({
        data: {
          name: invitee.name,
          maxKidsCount: invitee.maxKidsCount,
        },
      });
      console.log(`✨ Created: ${invitee.name} (max ${invitee.maxKidsCount} kids)`);
    }
  }

  console.log("\n✅ Seeding completed successfully!");
  console.log(`📊 Total invitees: ${invitees.length}`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
