import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request, { params }) {
  try {
    const {  id  } = await params;
    const { title, tag, price, imageUrl, order } = await request.json();
    const slider = await prisma.slider.update({
      where: { id },
      data: { 
        title, 
        tag, 
        price, 
        imageUrl, 
        order: order !== undefined ? parseInt(order) : undefined 
      }
    });
    return NextResponse.json(slider);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update slider', details: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const {  id  } = await params;
    await prisma.slider.delete({
      where: { id }
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete slider' }, { status: 500 });
  }
}
