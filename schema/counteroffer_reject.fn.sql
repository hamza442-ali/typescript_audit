CREATE OR REPLACE FUNCTION counteroffer_reject(
    counteroffer_id BIGINT,
    counteroffer_user_id BIGINT, 
    counteroffer_user_message TEXT,
    counteroffer_offer_id BIGINT, 
    offer_user_id BIGINT,
    offer_user_message TEXT
)
RETURNS TEXT AS $$ 
DECLARE
    v_existing_status TEXT;
BEGIN
    -- Check if counteroffer already has the 'REJECTED' status
    SELECT counter_status INTO v_existing_status
    FROM counteroffers
    WHERE id = counteroffer_id AND counteroffers.offer_id = counteroffer_offer_id;

    IF v_existing_status = 'REJECTED' THEN
        RETURN 'Counteroffer already rejected.';
    END IF;

    -- Reject the specified counteroffer
    UPDATE counteroffers
    SET counter_status = 'REJECTED'
    WHERE id = counteroffer_id AND counteroffers.offer_id = counteroffer_offer_id;

    -- Make notifications
    INSERT INTO notifications (sender_id, recipient_id, content)
    VALUES 
        (NULL, counteroffer_user_id, counteroffer_user_message),
        (NULL, offer_user_id, offer_user_message);

    RETURN NULL; -- Returns NULL on successful completion

EXCEPTION
    WHEN others THEN
        -- In case of any error, rollback is automatic. Just return the error message.
        RETURN 'An error occurred: ' || SQLERRM;
END;
$$ LANGUAGE plpgsql;
