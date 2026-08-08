export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    const admin = await prisma.admin.findUnique({ where: { email } });
    
    if (!admin) {
      return NextResponse.json({ error: 'Email not registered as admin.' }, { status: 403 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Verify google error:", error);
    return NextResponse.json({ error: 'Verification failed.' }, { status: 500 });
  }
}
