import { createClient } from '@supabase/supabase-js';

const url = 'https://zivxeumnpsafgrnbtwax.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppdnhldW1ucHNhZmdybmJ0d2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzOTE5NjksImV4cCI6MjEwMDk2Nzk2OX0.xZxPRDqzU4i6EDpvrHpmtWyPQZ4xjzFHEtvgfF4PNB8';

const supabase = createClient(url, key);

async function createAdmin() {
  console.log('Attempting to create admin account...');
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@finguard.ai',
    password: 'admin123',
    options: {
      data: {
        full_name: 'System Administrator'
      }
    }
  });

  if (error) {
    console.error('Error creating account:', error.message);
  } else {
    console.log('Account created successfully!', data.user.email);
  }
}

createAdmin();
