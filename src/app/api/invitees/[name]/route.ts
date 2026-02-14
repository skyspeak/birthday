import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    
    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const decodedName = decodeURIComponent(name);
    
    const invitee = await prisma.invitee.findFirst({
      where: {
        name: {
          equals: decodedName.trim(),
          mode: 'insensitive',
        },
      },
    });

    if (!invitee) {
      return NextResponse.json(
        { error: "Invitee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      name: invitee.name,
      maxKidsCount: invitee.maxKidsCount,
      isAttending: invitee.isAttending,
      adultsCount: invitee.adultsCount,
      kidsCount: invitee.kidsCount,
      message: invitee.message,
    });
  } catch (error) {
    console.error("Failed to fetch invitee:", error);
    return NextResponse.json(
      { error: "Failed to fetch invitee" },
      { status: 500 }
    );
  }
}
