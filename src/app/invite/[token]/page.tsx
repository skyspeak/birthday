import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import InvitePageClient from "./InvitePageClient";

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function InvitePage({ params }: PageProps) {
  const { token } = await params;

  const invitee = await prisma.invitee.findUnique({
    where: { token },
  });

  if (!invitee) {
    notFound();
  }

  return (
    <InvitePageClient
      invitee={{
        name: invitee.name,
        token: invitee.token,
        isAttending: invitee.isAttending,
        adultsCount: invitee.adultsCount,
        kidsCount: invitee.kidsCount,
        message: invitee.message,
      }}
    />
  );
}
