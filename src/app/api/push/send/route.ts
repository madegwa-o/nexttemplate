import { NextRequest, NextResponse } from 'next/server';
import webpush from 'web-push';
// import Subscription from '@/models/Subscription';

// Configure web-push
webpush.setVapidDetails(
    process.env.VAPID_EMAIL!,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
);


type PushSubscriptionData = {
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
};

export async function POST(request: NextRequest) {
    try {
        const { title, body, url, userId } = await request.json();

        // Get user's subscriptions from database
        // const subscriptions = await Subscription.find({ userId });

        // For demo purposes, using a mock subscription
        const subscriptions: PushSubscriptionData[] = []; // Replace with actual DB query

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
                        keys: sub.keys,
                    },
                    payload
                )
            )
        );

        return NextResponse.json({
            success: true,
            sent: results.filter((r) => r.status === 'fulfilled').length,
            failed: results.filter((r) => r.status === 'rejected').length,
        });
    } catch (error) {
        console.error('Error sending push notification:', error);
        return NextResponse.json(
            { error: 'Failed to send notification' },
            { status: 500 }
        );
    }
}