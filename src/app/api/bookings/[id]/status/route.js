import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request, { params }) {
  try {
    const {  id  } = await params;
    const { status } = await request.json();
    const booking = await prisma.booking.update({
      where: { id },
      data: { status }
    });
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return NextResponse.json({ error: 'Failed to update booking status' }, { status: 500 });
  }
}
