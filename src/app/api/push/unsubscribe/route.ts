import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const subscription = await request.json();

        // Remove subscription from your database
        // await Subscription.deleteOne({
        //   userId: session.user.id,
        //   endpoint: subscription.endpoint,
        // });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error removing subscription:', error);
        return NextResponse.json(
            { error: 'Failed to remove subscription' },
            { status: 500 }
        );
    }
}