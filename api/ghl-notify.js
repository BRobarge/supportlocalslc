import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.slice(7));
    if (authError || !user) return res.status(401).json({ error: 'Unauthorized' });

    const webhookUrl = process.env.GHL_WEBHOOK_URL;
    if (!webhookUrl) {
        console.error('GHL_WEBHOOK_URL not configured');
        return res.status(500).json({ error: 'Webhook not configured' });
    }

    const { event, payload } = req.body;
    if (!event) return res.status(400).json({ error: 'Missing event' });

    const ghlRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, ...payload }),
    });

    res.status(200).json({ ok: true, status: ghlRes.status });
}
