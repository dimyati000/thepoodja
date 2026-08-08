export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(request, { params }) {
  try {
    const {  id  } = await params;
    const { email, password } = await request.json();
    
    const updateData = {};
    if (email) updateData.email = email;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data: updateData,
      select: { id: true, email: true, createdAt: true }
    });

    return NextResponse.json(updatedAdmin);
  } catch (error) {
    console.error("Failed to update admin:", error);
    return NextResponse.json({ error: 'Failed to update admin' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const {  id  } = await params;
    await prisma.admin.delete({ where: { id } });
    return NextResponse.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error("Failed to delete admin:", error);
    return NextResponse.json({ error: 'Failed to delete admin' }, { status: 500 });
  }
}
