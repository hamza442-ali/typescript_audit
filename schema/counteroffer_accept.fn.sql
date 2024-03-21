CREATE OR REPLACE FUNCTION counteroffer_accept(
    counteroffer_id BIGINT,
    counteroffer_user_id BIGINT, 
    counteroffer_user_message TEXT,
    counteroffer_offer_id BIGINT, 
    offer_user_id BIGINT,
    offer_user_message TEXT,
    loan_lender_id BIGINT,
    loan_borrower_id BIGINT,
    loan_borrow_currency TEXT,
    loan_collateral_currency TEXT,
    loan_borrow_amount NUMERIC,
    loan_collateral_amount NUMERIC,
    loan_duration_days NUMERIC,
    loan_fee_amount NUMERIC,
    loan_grace_period_days NUMERIC,
    loan_installments NUMERIC,
    loan_interest_rate NUMERIC,
    loan_penalty_rate NUMERIC,
    loan_remaining_balance NUMERIC,
    loan_repay_amount NUMERIC,
    loan_is_active BOOLEAN,
    loan_is_pending BOOLEAN
)
RETURNS loans AS $$ -- Change return type to match the structure of the loans table
DECLARE
    v_existing_status TEXT;
    v_new_loan_id BIGINT; -- Variable to store the new loan record id
BEGIN
    -- Check if counteroffer already has the 'REJECTED' status
    SELECT counter_status INTO v_existing_status
    FROM counteroffers
    WHERE id = counteroffer_id AND counteroffers.offer_id = counteroffer_offer_id;

    IF v_existing_status = 'ACCEPTED' THEN
        -- If the counteroffer is already accepted, return a NULL record (or handle as per your requirements)
        RETURN NULL::loans;
    END IF;

    -- Accept the offer
    UPDATE counteroffers
    SET counter_status = 'ACCEPTED'
    WHERE id = counteroffer_id AND counteroffers.offer_id = counteroffer_offer_id;

    -- Reject other offers
    UPDATE counteroffers
    SET counter_status = 'REJECTED'
    WHERE counteroffers.offer_id = counteroffer_offer_id AND id <> counteroffer_id;

    -- Insert into loans table and capture the new loan record
    INSERT INTO loans (
        lender_id,
        borrower_id,
        borrow_currency,
        collateral_currency,
        borrow_amount,
        collateral_amount,
        duration_days,
        fee_amount,
        grace_period_days,
        installments,
        interest_rate,
        penalty_rate,
        remaining_balance,
        repay_amount,
        is_active,
        funding_expires_at,
        is_pending) 
    VALUES (
        loan_lender_id,
        loan_borrower_id,
        loan_borrow_currency,
        loan_collateral_currency,
        loan_borrow_amount,
        loan_collateral_amount,
        loan_duration_days,
        loan_fee_amount,
        loan_grace_period_days,
        loan_installments,
        loan_interest_rate,
        loan_penalty_rate,
        loan_remaining_balance,
        loan_repay_amount,
        loan_is_active,
        NOW() + INTERVAL '48 hours',
        loan_is_pending
    )
    RETURNING id INTO v_new_loan_id; -- Capture the new loan id

    -- Make notifications
    INSERT INTO notifications (sender_id, recipient_id, content)
    VALUES 
        (NULL, counteroffer_user_id, counteroffer_user_message),
        (NULL, offer_user_id, offer_user_message);

    RETURN (SELECT t FROM loans t WHERE id = v_new_loan_id); -- Return the entire row for the new loan

EXCEPTION
    WHEN others THEN
        -- In case of any error, rollback is automatic. Return a NULL record to indicate an error occurred.
        RETURN NULL::loans;
END;
$$ LANGUAGE plpgsql;
