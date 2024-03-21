
INSERT INTO public.users (address, is_active, is_verified, is_admin) VALUES
('0x1234567890abcdef1234567890abcdef12345678', TRUE, TRUE, FALSE),
('0xabcdef1234567890abcdef1234567890abcdef12', TRUE, TRUE, FALSE);

INSERT INTO public.userprofiles (user_id, email, phone, family_name, middle_name, given_name, address_1, address_2, country, state_province, kyc_identifier, biography, website, city, postal_code) VALUES
(1, 'user1@example.com', '123-456-7890', 'Smith', 'John', 'Doe', '123 Main St', 'Apt 4B', 'USA', 'CA', 'KYC123456', 'I love lending and borrowing.', 'http://user1.com', 'Los Angeles', '90001'),
(2, 'user2@example.com', '987-654-3210', 'Doe', 'Jane', 'Smith', '456 Elm St', 'Suite 12A', 'USA', 'NY', 'KYC987654', 'Finance enthusiast.', 'http://user2.com', 'New York', '10001');

INSERT INTO public.loans (lender_id, borrower_id, borrow_currency, collateral_currency, borrow_amount, collateral_amount, duration_days, fee_amount, interest_rate, remaining_balance, is_active) VALUES
(1, 2, 'USD', 'ETH', 1000, 0.5, 30, 10, 5, 1000, TRUE),    -- Loan 1: User 1 lends to User 2
(1, 2, 'USD', 'BTC', 2000, 0.1, 60, 20, 6, 2000, TRUE),    -- Loan 2: User 1 lends to User 2
(2, 1, 'USD', 'ETH', 1500, 0.4, 45, 15, 4, 1500, TRUE);    -- Loan 3: User 2 lends to User 1

INSERT INTO public.payments (loan_id, payment_amount, payment_currency, payment_memo, user_id) VALUES
(1, 100, 'USD', 'Payment for Loan 1', 2),    -- Payment 1 for Loan 1 by User 2
(1, 200, 'USD', 'Payment for Loan 1', 2),    -- Payment 2 for Loan 1 by User 2
(2, 150, 'USD', 'Payment for Loan 2', 2),    -- Payment 1 for Loan 2 by User 2
(2, 250, 'USD', 'Payment for Loan 2', 2),    -- Payment 2 for Loan 2 by User 2
(3, 100, 'USD', 'Payment for Loan 3', 1),    -- Payment 1 for Loan 3 by User 1
(3, 200, 'USD', 'Payment for Loan 3', 1);    -- Payment 2 for Loan 3 by User 1

INSERT INTO public.offers (user_id, min_borrow_amount, min_collateral_amount, min_duration_days, lender_fee_percent, min_interest_rate, offer_status, offer_type, borrow_currency, collateral_currency) VALUES
(1, 500, 0.2, 15, 3, 4, 'ACTIVE', 'LEND', 'USD', 'ETH'),    -- Offer 1 by User 1
(1, 1000, 0.1, 30, 3, 5, 'ACTIVE', 'LEND', 'USD', 'BTC'),   -- Offer 2 by User 1
(2, 800, 0.3, 20, 2, 4, 'ACTIVE', 'BORROW', 'USD', 'ETH'),  -- Offer 3 by User 2
(2, 1200, 0.15, 40, 2, 6, 'ACTIVE', 'BORROW', 'USD', 'BTC');-- Offer 4 by User 2

INSERT INTO public.counteroffers (user_id, borrow_amount, collateral_amount, duration_days, lender_fee_percent, interest_rate) VALUES
(2, 600, 0.25, 20, 3, 4.5),    -- Counteroffer 1 for Offer 1 by User 2
(2, 1100, 0.12, 35, 3, 5.5),   -- Counteroffer 2 for Offer 2 by User 2
(1, 850, 0.28, 22, 2.5, 4.2),  -- Counteroffer 3 for Offer 3 by User 1
(1, 1150, 0.13, 38, 2.5, 5.8); -- Counteroffer 4 for Offer 4 by User 1

INSERT INTO public.notifications (sender_id, recipient_id, content, created_at, read_at) VALUES
(NULL, 1, 'Welcome to the platform, User 1!', '2023-08-20 08:00:00', '2023-08-20 09:00:00'),  -- System notification to User 1
(NULL, 2, 'Welcome to the platform, User 2!', '2023-08-20 08:10:00', '2023-08-20 10:00:00'),  -- System notification to User 2
(1, 2, 'Thank you for accepting the loan offer.', '2023-08-20 10:00:00', '2023-08-20 11:00:00'), -- Notification from User 1 to User 2
(2, 1, 'I have made the payment. Please check.', '2023-08-21 12:00:00', NULL);  -- Notification from User 2 to User 1
