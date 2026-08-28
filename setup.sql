-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create accounts table
CREATE TABLE IF NOT EXISTS public.accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  account_type TEXT DEFAULT 'checking' CHECK (account_type IN ('checking', 'savings', 'credit')),
  balance NUMERIC(14, 2) NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'INR',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'Other',
  amount NUMERIC(14, 2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('debit', 'credit')),
  is_ai BOOLEAN DEFAULT FALSE,
  occurred_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_account_id ON public.transactions(account_id);

-- 4. Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- 5. Create policy for profiles
DROP POLICY IF EXISTS "Users can read and update own profile" ON public.profiles;
CREATE POLICY "Users can read and update own profile"
  ON public.profiles FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 6. Create trigger function to auto-create profile, account, and seed data upon signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_account_id UUID;
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Demo User'),
    new.email,
    'user'
  );

  -- Auto-create checking account for the new user
  INSERT INTO public.accounts (user_id, account_type, balance, currency)
  VALUES (new.id, 'checking', 284000.00, 'INR')
  RETURNING id INTO v_account_id;

  -- Auto-seed 28 realistic transactions for this checking account
  INSERT INTO public.transactions (account_id, user_id, description, category, amount, type, is_ai, occurred_at) VALUES
  (v_account_id, new.id, 'Adani Power', 'Bills', -3200.00, 'debit', true, NOW() - INTERVAL '10 hours'),
  (v_account_id, new.id, 'Starbucks', 'Food', -450.00, 'debit', false, NOW() - INTERVAL '11 hours'),
  (v_account_id, new.id, 'TechCorp Inc.', 'Salary', 125000.00, 'credit', false, NOW() - INTERVAL '1 day'),
  (v_account_id, new.id, 'Amazon Shopping', 'Shopping', -2499.00, 'debit', false, NOW() - INTERVAL '1 day 4 hours'),
  (v_account_id, new.id, 'Uber Ride', 'Transport', -320.00, 'debit', true, NOW() - INTERVAL '2 days'),
  (v_account_id, new.id, 'Netflix Subscription', 'Entertainment', -649.00, 'debit', false, NOW() - INTERVAL '2 days 6 hours'),
  (v_account_id, new.id, 'Swiggy Gourmet', 'Food', -890.00, 'debit', false, NOW() - INTERVAL '3 days'),
  (v_account_id, new.id, 'Zomato Dining', 'Food', -1450.00, 'debit', false, NOW() - INTERVAL '3 days 8 hours'),
  (v_account_id, new.id, 'Airtel Broadband', 'Bills', -1199.00, 'debit', false, NOW() - INTERVAL '4 days'),
  (v_account_id, new.id, 'BookMyShow', 'Entertainment', -750.00, 'debit', false, NOW() - INTERVAL '4 days 5 hours'),
  (v_account_id, new.id, 'Decathlon Sports', 'Shopping', -3850.00, 'debit', false, NOW() - INTERVAL '5 days'),
  (v_account_id, new.id, 'Indian Oil Petrol', 'Transport', -2200.00, 'debit', false, NOW() - INTERVAL '5 days 10 hours'),
  (v_account_id, new.id, 'Freelance Consulting Payment', 'Income', 25000.00, 'credit', false, NOW() - INTERVAL '6 days'),
  (v_account_id, new.id, 'Blinkit Grocery', 'Food', -1240.00, 'debit', false, NOW() - INTERVAL '6 days 4 hours'),
  (v_account_id, new.id, 'Apple iCloud Storage', 'Bills', -219.00, 'debit', false, NOW() - INTERVAL '7 days'),
  (v_account_id, new.id, 'Myntra Fashion', 'Shopping', -4120.00, 'debit', false, NOW() - INTERVAL '7 days 9 hours'),
  (v_account_id, new.id, 'Ola Cabs', 'Transport', -430.00, 'debit', false, NOW() - INTERVAL '8 days'),
  (v_account_id, new.id, 'Cult.fit Gym Membership', 'Health', -1999.00, 'debit', false, NOW() - INTERVAL '8 days 7 hours'),
  (v_account_id, new.id, 'Dividends Payout', 'Income', 3200.00, 'credit', false, NOW() - INTERVAL '9 days'),
  (v_account_id, new.id, 'Zepto Instant Delivery', 'Food', -670.00, 'debit', false, NOW() - INTERVAL '9 days 6 hours'),
  (v_account_id, new.id, 'Croma Electronics', 'Shopping', -8900.00, 'debit', false, NOW() - INTERVAL '10 days'),
  (v_account_id, new.id, 'Spotify Premium', 'Entertainment', -119.00, 'debit', false, NOW() - INTERVAL '10 days 12 hours'),
  (v_account_id, new.id, 'HPCL Fuel', 'Transport', -1800.00, 'debit', false, NOW() - INTERVAL '11 days'),
  (v_account_id, new.id, 'Cash Withdrawal ATM', 'Withdrawal', -5000.00, 'debit', false, NOW() - INTERVAL '11 days 8 hours'),
  (v_account_id, new.id, 'Uber Eats', 'Food', -540.00, 'debit', false, NOW() - INTERVAL '12 days'),
  (v_account_id, new.id, 'Recharge Jio Prepaid', 'Bills', -749.00, 'debit', false, NOW() - INTERVAL '12 days 10 hours'),
  (v_account_id, new.id, 'Nykaa Cosmetics', 'Shopping', -2150.00, 'debit', false, NOW() - INTERVAL '13 days'),
  (v_account_id, new.id, 'Blue Tokai Coffee', 'Food', -380.00, 'debit', false, NOW() - INTERVAL '13 days 6 hours');

  RETURN new;
END;
$$;

-- 7. Attach trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
