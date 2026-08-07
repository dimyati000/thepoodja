import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { email, firstName, lastName, avatarUrl } = await request.json();
    
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        firstName,
        lastName,
        avatarUrl,
      },
      create: {
        email,
        firstName,
        lastName,
        avatarUrl,
      }
    });
    
    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to sync user:", error);
    return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 });
  }
}
