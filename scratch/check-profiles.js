const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zivxeumnpsafgrnbtwax.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppdnhldW1ucHNhZmdybmJ0d2F4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTM5MTk2OSwiZXhwIjoyMTAwOTY3OTY5fQ.AjzPErUUwWPHaNNLRqfmuCbvJTEtX4odTYTGwLsQklw';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkProfiles() {
  const { data, error } = await supabase.from('profiles').select('*');
  console.log('Profiles:', data);
  if (error) console.error('Error:', error);
}

checkProfiles();
