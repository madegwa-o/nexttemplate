import { NextRequest, NextResponse } from 'next/server';
import webpush from 'web-push';

// Configure web-push with VAPID details
webpush.setVapidDetails(
    process.env.VAPID_EMAIL!,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
);

type PushSubscriptionJSON = {
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
};

// In-memory storage for subscriptions (for testing only)
// In production, use a database
const subscriptions: PushSubscriptionJSON[] = [];

export async function POST(request: NextRequest) {
    try {
        const { title, body, url } = await request.json();

        if (!title || !body) {
            return NextResponse.json(
                { error: 'Title and body are required' },
                { status: 400 }
            );
        }

        // For testing: Get all subscriptions from your database
        // const subscriptions = await Subscription.find({});

        // If no subscriptions in memory, return early
        if (subscriptions.length === 0) {
            return NextResponse.json({
                success: true,
                sent: 0,
                failed: 0,
                message: 'No active subscriptions. Please subscribe first.',
            });
        }

        const payload = JSON.stringify({
            title,
            body,
            url: url || '/',
        });

        const results = await Promise.allSettled(
            subscriptions.map((sub) =>
                webpush.sendNotification(
                    {
                        endpoint: sub.endpoint,
                        keys: {
                            p256dh: sub.keys.p256dh,
                            auth: sub.keys.auth,
                        },
                    },
                    payload
                )
            )
        );

        const sent = results.filter((r) => r.status === 'fulfilled').length;
        const failed = results.filter((r) => r.status === 'rejected').length;

        return NextResponse.json({
            success: true,
            sent,
            failed,
            total: subscriptions.length,
        });
    } catch (error) {
        console.error('Error sending push notification:', error);
        return NextResponse.json(
            { error: 'Failed to send notification' },
            { status: 500 }
        );
    }
}

// Helper endpoint to add a subscription (for testing)
export async function PUT(request: NextRequest) {
    try {
        const subscription = await request.json();

        // Check if subscription already exists
        const exists = subscriptions.some(
            (sub) => sub.endpoint === subscription.endpoint
        );

        if (!exists) {
            subscriptions.push(subscription);
        }

        return NextResponse.json({
            success: true,
            message: 'Subscription added',
            total: subscriptions.length,
        });
    } catch (error) {
        console.error('Error adding subscription:', error);
        return NextResponse.json(
            { error: 'Failed to add subscription' },
            { status: 500 }
        );
    }
}