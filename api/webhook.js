const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

export const config = {
    api: {
        bodyParser: false,
    },
};

async function buffer(readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            buf,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const userId = session.metadata.userId;
            const subscriptionId = session.subscription;

            // Get subscription details
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            const priceId = subscription.items.data[0].price.id;

            // Determine plan based on price ID
            let membershipLevel = 'free';
            if (priceId === 'price_1RyeG9LLX7qXMo92RNtgTF81' || priceId === 'price_1RyeG9LLX7qXMo92z7XuFggu') {
                membershipLevel = 'pro';
            } else if (priceId === 'price_1RyeF3LLX7qXMo92ukdJY0Rb' || priceId === 'price_1RyeF3LLX7qXMo92PeSXddUV') {
                membershipLevel = 'essentials';
            }

            // Update user profile
            await supabase
                .from('profiles')
                .update({
                    membership_level: membershipLevel,
                    stripe_customer_id: session.customer,
                    stripe_subscription_id: subscriptionId,
                    plan_status: 'active',
                    stripe_current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
                })
                .eq('id', userId);

            break;

        case 'customer.subscription.deleted':
            // Downgrade user to free
            const deletedSub = event.data.object;
            await supabase
                .from('profiles')
                .update({
                    membership_level: 'free',
                    stripe_subscription_id: null,
                })
                .eq('stripe_subscription_id', deletedSub.id);
            break;
    }

    res.json({ received: true });
}