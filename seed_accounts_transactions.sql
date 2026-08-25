-- Seed script for FinGuard Accounts & Transactions
-- Reshaped from banking dataset into FinGuard schema

DO $$
DECLARE
  v_user_id UUID;
  v_account_id UUID;
BEGIN
  -- 1. Locate user_id for user@finguard.ai from profiles
  SELECT id INTO v_user_id FROM public.profiles WHERE email = 'user@finguard.ai' LIMIT 1;
  
  IF v_user_id IS NULL THEN
    RAISE NOTICE 'user@finguard.ai profile not found. Please ensure auth signup occurs first.';
    RETURN;
  END IF;

  -- 2. Create main checking account if it does not exist
  INSERT INTO public.accounts (user_id, account_type, balance, currency)
  VALUES (v_user_id, 'checking', 284000.00, 'INR')
  ON CONFLICT DO NOTHING;

  SELECT id INTO v_account_id FROM public.accounts WHERE user_id = v_user_id AND account_type = 'checking' LIMIT 1;

  -- 3. Clear old seed transactions for a clean state
  DELETE FROM public.transactions WHERE user_id = v_user_id;

  -- 4. Insert 28 realistic debit/credit transactions spanning recent 14 days
  INSERT INTO public.transactions (account_id, user_id, description, category, amount, type, is_ai, occurred_at) VALUES
  (v_account_id, v_user_id, 'Adani Power', 'Bills', -3200.00, 'debit', true, NOW() - INTERVAL '10 hours'),
  (v_account_id, v_user_id, 'Starbucks', 'Food', -450.00, 'debit', false, NOW() - INTERVAL '11 hours'),
  (v_account_id, v_user_id, 'TechCorp Inc.', 'Salary', 125000.00, 'credit', false, NOW() - INTERVAL '1 day'),
  (v_account_id, v_user_id, 'Amazon Shopping', 'Shopping', -2499.00, 'debit', false, NOW() - INTERVAL '1 day 4 hours'),
  (v_account_id, v_user_id, 'Uber Ride', 'Transport', -320.00, 'debit', true, NOW() - INTERVAL '2 days'),
  (v_account_id, v_user_id, 'Netflix Subscription', 'Entertainment', -649.00, 'debit', false, NOW() - INTERVAL '2 days 6 hours'),
  (v_account_id, v_user_id, 'Swiggy Gourmet', 'Food', -890.00, 'debit', false, NOW() - INTERVAL '3 days'),
  (v_account_id, v_user_id, 'Zomato Dining', 'Food', -1450.00, 'debit', false, NOW() - INTERVAL '3 days 8 hours'),
  (v_account_id, v_user_id, 'Airtel Broadband', 'Bills', -1199.00, 'debit', false, NOW() - INTERVAL '4 days'),
  (v_account_id, v_user_id, 'BookMyShow', 'Entertainment', -750.00, 'debit', false, NOW() - INTERVAL '4 days 5 hours'),
  (v_account_id, v_user_id, 'Decathlon Sports', 'Shopping', -3850.00, 'debit', false, NOW() - INTERVAL '5 days'),
  (v_account_id, v_user_id, 'Indian Oil Petrol', 'Transport', -2200.00, 'debit', false, NOW() - INTERVAL '5 days 10 hours'),
  (v_account_id, v_user_id, 'Freelance Consulting Payment', 'Income', 25000.00, 'credit', false, NOW() - INTERVAL '6 days'),
  (v_account_id, v_user_id, 'Blinkit Grocery', 'Food', -1240.00, 'debit', false, NOW() - INTERVAL '6 days 4 hours'),
  (v_account_id, v_user_id, 'Apple iCloud Storage', 'Bills', -219.00, 'debit', false, NOW() - INTERVAL '7 days'),
  (v_account_id, v_user_id, 'Myntra Fashion', 'Shopping', -4120.00, 'debit', false, NOW() - INTERVAL '7 days 9 hours'),
  (v_account_id, v_user_id, 'Ola Cabs', 'Transport', -430.00, 'debit', false, NOW() - INTERVAL '8 days'),
  (v_account_id, v_user_id, 'Cult.fit Gym Membership', 'Health', -1999.00, 'debit', false, NOW() - INTERVAL '8 days 7 hours'),
  (v_account_id, v_user_id, 'Dividends Payout', 'Income', 3200.00, 'credit', false, NOW() - INTERVAL '9 days'),
  (v_account_id, v_user_id, 'Zepto Instant Delivery', 'Food', -670.00, 'debit', false, NOW() - INTERVAL '9 days 6 hours'),
  (v_account_id, v_user_id, 'Croma Electronics', 'Shopping', -8900.00, 'debit', false, NOW() - INTERVAL '10 days'),
  (v_account_id, v_user_id, 'Spotify Premium', 'Entertainment', -119.00, 'debit', false, NOW() - INTERVAL '10 days 12 hours'),
  (v_account_id, v_user_id, 'HPCL Fuel', 'Transport', -1800.00, 'debit', false, NOW() - INTERVAL '11 days'),
  (v_account_id, v_user_id, 'Cash Withdrawal ATM', 'Withdrawal', -5000.00, 'debit', false, NOW() - INTERVAL '11 days 8 hours'),
  (v_account_id, v_user_id, 'Uber Eats', 'Food', -540.00, 'debit', false, NOW() - INTERVAL '12 days'),
  (v_account_id, v_user_id, 'Recharge Jio Prepaid', 'Bills', -749.00, 'debit', false, NOW() - INTERVAL '12 days 10 hours'),
  (v_account_id, v_user_id, 'Nykaa Cosmetics', 'Shopping', -2150.00, 'debit', false, NOW() - INTERVAL '13 days'),
  (v_account_id, v_user_id, 'Blue Tokai Coffee', 'Food', -380.00, 'debit', false, NOW() - INTERVAL '13 days 6 hours');
END $$;
