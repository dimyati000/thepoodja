export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // Check if admin exists in DB
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return NextResponse.json({ error: 'Email not registered as admin.' }, { status: 401 });
    }

    if (!admin.password) {
      return NextResponse.json({ error: 'Password not set for this admin.' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email }, 
      process.env.JWT_SECRET || 'secret', 
      { expiresIn: '1d' }
    );
    
    return NextResponse.json({ success: true, token, email: admin.email });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: 'Authentication failed.' }, { status: 500 });
  }
}
