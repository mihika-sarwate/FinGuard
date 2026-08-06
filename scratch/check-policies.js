const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zivxeumnpsafgrnbtwax.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppdnhldW1ucHNhZmdybmJ0d2F4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTM5MTk2OSwiZXhwIjoyMTAwOTY3OTY5fQ.AjzPErUUwWPHaNNLRqfmuCbvJTEtX4odTYTGwLsQklw';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkPolicies() {
  const { data, error } = await supabase.rpc('get_policies', {});
  console.log(data, error);
  // Actually, we can just query pg_policies
  const { data: policies, error: pErr } = await supabase
    .from('pg_policies')
    .select('*')
    .eq('tablename', 'profiles');
    
  console.log('Policies on profiles:', policies);
}

checkPolicies();
