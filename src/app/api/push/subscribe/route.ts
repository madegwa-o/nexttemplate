import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
// Import your database model for storing subscriptions
// import Subscription from '@/models/Subscription';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const subscription = await request.json();

        // Store subscription in your database
        // await Subscription.create({
        //   userId: session.user.id,
        //   endpoint: subscription.endpoint,
        //   keys: subscription.keys,
        // });

        console.log('New subscription:', subscription);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving subscription:', error);
        return NextResponse.json(
            { error: 'Failed to save subscription' },
            { status: 500 }
        );
    }
}