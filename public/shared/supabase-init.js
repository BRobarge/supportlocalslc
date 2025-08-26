// Create a single global Supabase client, once.
if (!window.supabaseClient) {
    window.supabaseClient = supabase.createClient(
        'https://kozlfywdsqjndcsibgtw.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvemxmeXdkc3FqbmRjc2liZ3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNTk0NzEsImV4cCI6MjA2NzgzNTQ3MX0.Xb0nRQIVhpW_7uBcwfIuvGZmyPMGzJq6k-6fdgfF3kw'
    );
}
