import { createClient } from '@supabase/supabase-js';

// Constructing URL from project ref found in pooler URL or requiring env var
// Project Ref appears to be: zojulnxqfncbtrlkwkkc
const PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zojulnxqfncbtrlkwkkc.supabase.co';
const SERVICE_KEY = process.env.DATABASE_serviceRoleKEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SERVICE_KEY) {
    console.error("CRITICAL: Supabase Service Role Key is missing.");
}

// Admin Client (for server-side uploads bypassing RLS)
export const supabaseAdmin = createClient(PROJECT_URL, SERVICE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
