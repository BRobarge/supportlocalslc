console.log('🔵 supabase-init.js loaded at', new Date().toISOString());

const { createClient } = supabase;

window.supabaseClient = createClient(
    'https://kozlfywdsqjndcsibgtw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvemxmeXdkc2pjbmRjc2liZ3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyNzg0MjUsImV4cCI6MjAzMTg1NDQyNX0.Xb0nRQIVhpW_7uBcwfIuvGZmyPMGzJq6k-6fdgfF3kw',
    {
        auth: {
            persistSession: true,
            storage: window.localStorage,
            storageKey: 'supabase.auth.token',
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    }
);

console.log('🟢 supabase client created:', window.supabaseClient);