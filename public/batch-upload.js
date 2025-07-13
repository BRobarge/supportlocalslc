const { createClient } = require('@supabase/supabase-js');  // For node run; remove if browser console

const supabaseUrl = 'https://kozlfywdsqjndcsibgtw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvemxmeXdkc3FqbmRjc2liZ3R3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjI1OTQ3MSwiZXhwIjoyMDY3ODM1NDcxfQ.RyBSsdfyM-aOYcIgT5wAki2GWvrDXjOJMZHFXXsulNI';  // Use your admin key if needed for bulk (anon for now)
const supabase = createClient(supabaseUrl, supabaseKey);

// Sample businesses array—replace with your 100+ (e.g., from CSV parse later)
const businesses = [
  { name: 'Test Biz 1', address: '123 Main St, Sandy UT', categories: ['Retail'], description: 'Cool shop' },
  { name: 'Test Biz 2', address: '456 Elm St, Sandy UT', categories: ['Service'], description: 'Handy services' },
  // Add more here...
];

// Function to generate random 6-char code (uppercase letters + numbers)
function generateClaimCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// Async function to upload batch
async function uploadBatch() {
  for (const biz of businesses) {
    const code = generateClaimCode();  // Gen unique code
    const data = { ...biz, claim_code: code, claim_status: 'unclaimed' };  // Add code/status
    const { error } = await supabase.from('businesses').insert(data);
    if (error) {
      console.error('Error adding', biz.name, error.message);
    } else {
      console.log('Added', biz.name, 'with code:', code);  // Log for you to copy/email
    }
  }
}

uploadBatch();  // Run it