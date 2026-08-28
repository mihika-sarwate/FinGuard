import { createClient } from '@supabase/supabase-js';

const url = 'https://zivxeumnpsafgrnbtwax.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppdnhldW1ucHNhZmdybmJ0d2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzOTE5NjksImV4cCI6MjEwMDk2Nzk2OX0.xZxPRDqzU4i6EDpvrHpmtWyPQZ4xjzFHEtvgfF4PNB8';

const supabase = createClient(url, key);

async function setupDatabase() {
  console.log('--- Initializing FinGuard Supabase DB Setup ---');

  // 1. Ensure user@finguard.ai exists
  console.log('1. Checking/Registering demo user (user@finguard.ai)...');
  let userId = null;

  let userSignIn = await supabase.auth.signInWithPassword({
    email: 'user@finguard.ai',
    password: 'user123'
  });

  if (userSignIn.data?.user) {
    userId = userSignIn.data.user.id;
    console.log('Found user@finguard.ai:', userId);
  } else {
    const userSignUp = await supabase.auth.signUp({
      email: 'user@finguard.ai',
      password: 'user123',
      options: { data: { full_name: 'Demo User' } }
    });
    if (userSignUp.data?.user) {
      userId = userSignUp.data.user.id;
      console.log('Created user@finguard.ai:', userId);
    } else {
      console.error('Failed to create/login user@finguard.ai:', userSignUp.error || userSignIn.error);
    }
  }

  // 2. Ensure admin@finguard.ai exists
  console.log('2. Checking/Registering demo admin (admin@finguard.ai)...');
  let adminSignIn = await supabase.auth.signInWithPassword({
    email: 'admin@finguard.ai',
    password: 'admin123'
  });

  if (adminSignIn.data?.user) {
    console.log('Found admin@finguard.ai:', adminSignIn.data.user.id);
  } else {
    const adminSignUp = await supabase.auth.signUp({
      email: 'admin@finguard.ai',
      password: 'admin123',
      options: { data: { full_name: 'System Administrator' } }
    });
    if (adminSignUp.data?.user) {
      console.log('Created admin@finguard.ai:', adminSignUp.data.user.id);
      // Elevate admin role
      await supabase.from('profiles').update({ role: 'admin' }).eq('id', adminSignUp.data.user.id);
    }
  }

  if (!userId) {
    console.error('Cannot proceed with seeding without valid user@finguard.ai ID.');
    return;
  }

  // Sign in as user@finguard.ai to authenticate the client session for RLS checks
  console.log('Authenticating client session as user@finguard.ai...');
  const authRes = await supabase.auth.signInWithPassword({
    email: 'user@finguard.ai',
    password: 'user123'
  });
  if (authRes.error) {
    console.error('Sign in failed:', authRes.error.message);
  } else {
    console.log('Client session authenticated successfully.');
  }

  // 3. Ensure profile exists for user@finguard.ai
  console.log('3. Verifying profiles record...');
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (!profile) {
    console.log('Creating profile record manually...');
    await supabase.from('profiles').insert({
      id: userId,
      email: 'user@finguard.ai',
      full_name: 'Demo User',
      role: 'user'
    });
  }

  // 4. Create checking account for user@finguard.ai
  console.log('4. Creating checking account...');
  let accountId = null;
  const { data: existingAcc } = await supabase.from('accounts').select('id').eq('user_id', userId).single();

  if (existingAcc) {
    accountId = existingAcc.id;
    console.log('Found existing checking account:', accountId);
    await supabase.from('accounts').update({ balance: 284000.00, updated_at: new Date().toISOString() }).eq('id', accountId);
  } else {
    const { data: newAcc, error: accErr } = await supabase.from('accounts').insert({
      user_id: userId,
      account_type: 'checking',
      balance: 284000.00,
      currency: 'INR'
    }).select('id').single();

    if (accErr) {
      console.error('Error creating account:', accErr.message);
    } else {
      accountId = newAcc.id;
      console.log('Created checking account:', accountId);
    }
  }

  if (!accountId) {
    console.error('Account ID missing, please ensure accounts table is created in Supabase SQL editor.');
    return;
  }

  // 5. Seed 28 transactions
  console.log('5. Seeding transactions...');
  const seedTxns = [
    { description: 'Adani Power', category: 'Bills', amount: -3200.00, type: 'debit', is_ai: true, offsetDays: 0, offsetHours: 10 },
    { description: 'Starbucks', category: 'Food', amount: -450.00, type: 'debit', is_ai: false, offsetDays: 0, offsetHours: 11 },
    { description: 'TechCorp Inc.', category: 'Salary', amount: 125000.00, type: 'credit', is_ai: false, offsetDays: 1, offsetHours: 0 },
    { description: 'Amazon Shopping', category: 'Shopping', amount: -2499.00, type: 'debit', is_ai: false, offsetDays: 1, offsetHours: 4 },
    { description: 'Uber Ride', category: 'Transport', amount: -320.00, type: 'debit', is_ai: true, offsetDays: 2, offsetHours: 0 },
    { description: 'Netflix Subscription', category: 'Entertainment', amount: -649.00, type: 'debit', is_ai: false, offsetDays: 2, offsetHours: 6 },
    { description: 'Swiggy Gourmet', category: 'Food', amount: -890.00, type: 'debit', is_ai: false, offsetDays: 3, offsetHours: 0 },
    { description: 'Zomato Dining', category: 'Food', amount: -1450.00, type: 'debit', is_ai: false, offsetDays: 3, offsetHours: 8 },
    { description: 'Airtel Broadband', category: 'Bills', amount: -1199.00, type: 'debit', is_ai: false, offsetDays: 4, offsetHours: 0 },
    { description: 'BookMyShow', category: 'Entertainment', amount: -750.00, type: 'debit', is_ai: false, offsetDays: 4, offsetHours: 5 },
    { description: 'Decathlon Sports', category: 'Shopping', amount: -3850.00, type: 'debit', is_ai: false, offsetDays: 5, offsetHours: 0 },
    { description: 'Indian Oil Petrol', category: 'Transport', amount: -2200.00, type: 'debit', is_ai: false, offsetDays: 5, offsetHours: 10 },
    { description: 'Freelance Consulting Payment', category: 'Income', amount: 25000.00, type: 'credit', is_ai: false, offsetDays: 6, offsetHours: 0 },
    { description: 'Blinkit Grocery', category: 'Food', amount: -1240.00, type: 'debit', is_ai: false, offsetDays: 6, offsetHours: 4 },
    { description: 'Apple iCloud Storage', category: 'Bills', amount: -219.00, type: 'debit', is_ai: false, offsetDays: 7, offsetHours: 0 },
    { description: 'Myntra Fashion', category: 'Shopping', amount: -4120.00, type: 'debit', is_ai: false, offsetDays: 7, offsetHours: 9 },
    { description: 'Ola Cabs', category: 'Transport', amount: -430.00, type: 'debit', is_ai: false, offsetDays: 8, offsetHours: 0 },
    { description: 'Cult.fit Gym Membership', category: 'Health', amount: -1999.00, type: 'debit', is_ai: false, offsetDays: 8, offsetHours: 7 },
    { description: 'Dividends Payout', category: 'Income', amount: 3200.00, type: 'credit', is_ai: false, offsetDays: 9, offsetHours: 0 },
    { description: 'Zepto Instant Delivery', category: 'Food', amount: -670.00, type: 'debit', is_ai: false, offsetDays: 9, offsetHours: 6 },
    { description: 'Croma Electronics', category: 'Shopping', amount: -8900.00, type: 'debit', is_ai: false, offsetDays: 10, offsetHours: 0 },
    { description: 'Spotify Premium', category: 'Entertainment', amount: -119.00, type: 'debit', is_ai: false, offsetDays: 10, offsetHours: 12 },
    { description: 'HPCL Fuel', category: 'Transport', amount: -1800.00, type: 'debit', is_ai: false, offsetDays: 11, offsetHours: 0 },
    { description: 'Cash Withdrawal ATM', category: 'Withdrawal', amount: -5000.00, type: 'debit', is_ai: false, offsetDays: 11, offsetHours: 8 },
    { description: 'Uber Eats', category: 'Food', amount: -540.00, type: 'debit', is_ai: false, offsetDays: 12, offsetHours: 0 },
    { description: 'Recharge Jio Prepaid', category: 'Bills', amount: -749.00, type: 'debit', is_ai: false, offsetDays: 12, offsetHours: 10 },
    { description: 'Nykaa Cosmetics', category: 'Shopping', amount: -2150.00, type: 'debit', is_ai: false, offsetDays: 13, offsetHours: 0 },
    { description: 'Blue Tokai Coffee', category: 'Food', amount: -380.00, type: 'debit', is_ai: false, offsetDays: 13, offsetHours: 6 }
  ];

  const now = new Date();
  const dbRows = seedTxns.map(t => {
    const d = new Date(now.getTime() - (t.offsetDays * 86400000 + t.offsetHours * 3600000));
    return {
      account_id: accountId,
      user_id: userId,
      description: t.description,
      category: t.category,
      amount: t.amount,
      type: t.type,
      is_ai: t.is_ai,
      occurred_at: d.toISOString()
    };
  });

  // Delete existing transactions for user
  await supabase.from('transactions').delete().eq('user_id', userId);

  const { error: txErr } = await supabase.from('transactions').insert(dbRows);
  if (txErr) {
    console.error('Error inserting transactions:', txErr.message);
  } else {
    console.log(`Successfully seeded ${dbRows.length} transactions into Supabase!`);
  }

  console.log('--- Setup Completed Successfully ---');
}

setupDatabase();
