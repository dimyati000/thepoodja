export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: { user: true, villa: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Failed to fetch all bookings:", error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { email, villaId, checkIn, checkOut, guests, totalPrice } = await request.json();
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        villaId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guests: parseInt(guests),
        totalPrice: parseFloat(totalPrice)
      }
    });
    
    const earnedPoints = Math.floor(booking.totalPrice / 1000000);
    await prisma.user.update({
      where: { id: user.id },
      data: { points: { increment: earnedPoints } }
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Failed to create booking:", error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
