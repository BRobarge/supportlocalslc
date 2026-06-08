// Admin utility — run locally with: SUPABASE_SERVICE_KEY=<key> node scripts/batch-upload.js
// Never commit a real key here. Set SUPABASE_SERVICE_KEY in your local shell environment.
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kozlfywdsqjndcsibgtw.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseKey) {
    console.error('ERROR: SUPABASE_SERVICE_KEY environment variable is not set.');
    console.error('Run as: SUPABASE_SERVICE_KEY=<your-service-key> node scripts/batch-upload.js');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Replace with real business data before running
const businesses = [
    { name: 'Test Biz 1', address: '123 Main St, Sandy UT', categories: ['Retail'], description: 'Cool shop' },
    { name: 'Test Biz 2', address: '456 Elm St, Sandy UT', categories: ['Service'], description: 'Handy services' },
    // Add more here...
];

function generateClaimCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}

async function uploadBatch() {
    for (const biz of businesses) {
        const code = generateClaimCode();
        const { error } = await supabase
            .from('businesses')
            .insert({ ...biz, claim_code: code, claim_status: 'unclaimed' });
        if (error) {
            console.error('Error adding', biz.name, error.message);
        } else {
            console.log('Added', biz.name, 'with code:', code);
        }
    }
}

uploadBatch();
