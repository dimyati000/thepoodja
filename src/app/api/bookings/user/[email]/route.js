import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const {  email  } = await params;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: { villa: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Failed to fetch user bookings:", error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
