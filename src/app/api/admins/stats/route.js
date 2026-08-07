export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const totalUsers = await prisma.user.count();
    const totalVillas = await prisma.villa.count();
    const activeSliders = await prisma.slider.count();
    const pendingBookings = await prisma.booking.count({
      where: { status: 'PENDING' }
    });

    return NextResponse.json({
      totalUsers,
      totalVillas,
      activeSliders,
      pendingBookings
    });
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
