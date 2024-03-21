CREATE OR REPLACE FUNCTION upsert_profile(user INT)
RETURNS SETOF userprofiles
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO userprofiles(user_id, created_at, updated_at)
    VALUES (user, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (user_id) DO NOTHING;

    RETURN QUERY
    SELECT *
    FROM userprofiles
    WHERE user_id = user;
END;
$$;
