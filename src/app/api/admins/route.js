export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return NextResponse.json(admins);
  } catch (error) {
    console.error("Failed to fetch admins:", error);
    return NextResponse.json({ error: 'Failed to fetch admins' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Admin with this email already exists' }, { status: 400 });
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword
      },
      select: { id: true, email: true, createdAt: true }
    });

    return NextResponse.json(newAdmin, { status: 201 });
  } catch (error) {
    console.error("Failed to create admin:", error);
    return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 });
  }
}
