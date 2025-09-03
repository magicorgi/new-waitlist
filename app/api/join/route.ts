import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email: string | undefined = body?.email?.toString?.().trim();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    return NextResponse.json({ id: user.id, email: user.email, createdAt: user.createdAt });
  } catch (error) {
    console.error("Join waitlist error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


