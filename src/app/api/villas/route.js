export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const villas = await prisma.villa.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(villas);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, location, description, basePrice, imageUrl } = await request.json();
    const villa = await prisma.villa.create({
      data: { name, location, description, basePrice: parseFloat(basePrice), imageUrl }
    });
    return NextResponse.json(villa, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create villa', details: error.message }, { status: 500 });
  }
}
