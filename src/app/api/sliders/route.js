export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const sliders = await prisma.slider.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(sliders);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, tag, price, imageUrl, order } = await request.json();
    const slider = await prisma.slider.create({
      data: { title, tag, price, imageUrl, order: parseInt(order) || 0 }
    });
    return NextResponse.json(slider, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create slider', details: error.message }, { status: 500 });
  }
}
