import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const invitees = await prisma.invitee.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        adultsCount: true,
        kidsCount: true,
        isAttending: true,
        message: true,
        respondedAt: true,
      },
    });

    return NextResponse.json(invitees);
  } catch (error) {
    console.error("Failed to fetch invitees:", error);
    return NextResponse.json(
      { error: "Failed to fetch invitees" },
      { status: 500 }
    );
  }
}
