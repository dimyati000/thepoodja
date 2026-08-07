export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const {  id  } = await params;
    const villa = await prisma.villa.findUnique({
      where: { id }
    });
    if (!villa) return NextResponse.json({ error: 'Villa not found' }, { status: 404 });
    return NextResponse.json(villa);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const {  id  } = await params;
    const { name, location, description, basePrice, imageUrl } = await request.json();
    const villa = await prisma.villa.update({
      where: { id },
      data: { 
        name, 
        location, 
        description, 
        basePrice: basePrice ? parseFloat(basePrice) : undefined, 
        imageUrl 
      }
    });
    return NextResponse.json(villa);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update villa', details: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const {  id  } = await params;
    await prisma.villa.delete({
      where: { id }
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete villa' }, { status: 500 });
  }
}
