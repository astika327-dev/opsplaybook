import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { roomId, items, notes } = await req.json();

    try {
        const checklist = await prisma.cleaningChecklist.create({
            data: {
                roomId,
                items,
                notes,
                userId: session.user.id,
            },
        });
        return NextResponse.json(checklist);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create checklist' }, { status: 500 });
    }
}
