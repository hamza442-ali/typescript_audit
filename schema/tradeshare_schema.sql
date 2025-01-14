create table
    public.users (
        id bigint generated always as identity,
        address text not null,
        created_at timestamp
        with
            time zone not null default now (),
            updated_at timestamp
        with
            time zone not null default now (),
            is_active boolean null default true,
            is_verified boolean null default false,
            is_admin boolean null default false,
            constraint users_pkey primary key (id),
            constraint users_address_key unique (address)
    ) tablespace pg_default;

create table
    public.userprofiles (
        id bigint generated always as identity,
        user_id bigint not null,
        email text null,
        phone text null,
        family_name text null,
        middle_name text null,
        given_name text null,
        address_1 text null,
        address_2 text null,
        country text null,
        state_province text null,
        kyc_identifier text null,
        biography text null,
        website text null,
        created_at timestamp
        with
            time zone not null default now (),
            updated_at timestamp
        with
            time zone not null default now (),
            city text null,
            postal_code text null,
            constraint userprofiles_pkey primary key (id),
            constraint user_id_unique unique (user_id),
            constraint userprofiles_email_key unique (email),
            constraint userprofiles_user_id_fkey foreign key (user_id) references users (id)
    ) tablespace pg_default;

create table
    public.loans (
        id bigint generated always as identity,
        lender_id bigint null,
        borrower_id bigint null,
        borrow_currency text null,
        collateral_currency text null,
        loan_contract_address text null,
        borrow_amount numeric null,
        collateral_amount numeric null,
        duration_days numeric null,
        fee_amount numeric null,
        lender_fee_balance numeric null,
        grace_period_days numeric null,
        installments numeric null,
        interest_rate numeric null,
        last_payment_amount numeric null,
        minimum_payment_amount numeric null,
        penalty_rate numeric null,
        remaining_balance numeric null,
        repay_amount numeric null,
        created_at timestamp
        with
            time zone not null default now (),
            updated_at timestamp
        with
            time zone not null,
            last_payment_date timestamp
        with
            time zone null,
            next_payment_due_date timestamp
        with
            time zone null,
            is_active boolean null default true,
            is_in_default boolean null default false,
            is_in_grace_period boolean null default false,
            borrower_fee_percent numeric null,
            lender_fee_percent numeric null,
            borrower_fee_balance numeric null,
            funding_expires_at timestamp
        with
            time zone null,
            loan_funds_received boolean null default false,
            collateral_received boolean null default false,
            is_pending boolean null default false,
            constraint loans_pkey primary key (id),
            constraint loans_borrower_id_fkey foreign key (borrower_id) references users (id),
            constraint loans_lender_id_fkey foreign key (lender_id) references users (id)
    ) tablespace pg_default;

create index if not exists loans_lender_idx on public.loans using btree (lender_id) tablespace pg_default;

create index if not exists loans_borrower_idx on public.loans using btree (borrower_id) tablespace pg_default;

create table
    public.payments (
        id bigint generated by default as identity,
        created_at timestamp
        with
            time zone not null default now (),
            loan_id bigint null,
            payment_amount numeric null,
            payment_currency text null,
            payment_memo text null,
            user_id bigint null,
            constraint payments_pkey primary key (id),
            constraint payments_loan_id_fkey foreign key (loan_id) references loans (id) on delete restrict,
            constraint payments_user_id_fkey foreign key (user_id) references users (id) on delete restrict
    ) tablespace pg_default;

create table
    public.offers (
        id bigint generated always as identity,
        user_id bigint null,
        min_borrow_amount numeric null,
        min_collateral_amount numeric null,
        min_duration_days numeric null,
        lender_fee_percent numeric null,
        grace_period_days numeric null,
        min_installments numeric null,
        min_interest_rate numeric null,
        min_penalty_rate numeric null,
        borrower_fee_percent numeric null,
        created_at timestamp
        with
            time zone not null default now (),
            updated_at timestamp
        with
            time zone null default now (),
            offer_status text null,
            offer_type text null,
            borrow_currency text null,
            collateral_currency text null,
            max_borrow_amount numeric null,
            max_collateral_amount numeric null,
            max_duration_days numeric null,
            max_installments numeric null,
            expiration_date timestamp
        with
            time zone null,
            max_penalty_rate numeric null,
            max_interest_rate numeric null,
            constraint loanoffers_pkey primary key (id),
            constraint offers_user_id_fkey foreign key (user_id) references users (id)
    ) tablespace pg_default;

create index if not exists loanoffers_lender_idx on public.offers using btree (user_id) tablespace pg_default;

create table
    public.counteroffers (
        id bigint generated always as identity,
        user_id bigint null,
        borrow_amount numeric null,
        collateral_amount numeric null,
        duration_days numeric null,
        lender_fee_percent numeric null,
        grace_period_days numeric null,
        installments numeric null,
        interest_rate numeric null,
        penalty_rate numeric null,
        borrower_fee_percent numeric null,
        created_at timestamp
        with
            time zone not null default now (),
            updated_at timestamp
        with
            time zone null default now (),
            counter_status text null,
            expiration_date timestamp
        with
            time zone null,
            offer_id bigint null,
            constraint counteroffers_pkey primary key (id),
            constraint counteroffers_offer_id_fkey foreign key (offer_id) references offers (id) on delete cascade,
            constraint counteroffers_user_id_fkey foreign key (user_id) references users (id)
    ) tablespace pg_default;

create index if not exists counteroffers_lender_id_idx on public.counteroffers using btree (user_id) tablespace pg_default;

create table
    public.notifications (
        id bigint generated always as identity,
        sender_id bigint null,
        recipient_id bigint null,
        previous_notification_id bigint null,
        content text null,
        created_at timestamp
        with
            time zone not null default now (),
            read_at timestamp
        with
            time zone null,
            archived_at timestamp
        with
            time zone null,
            deleted_at timestamp
        with
            time zone null,
            constraint notifications_pkey primary key (id),
            constraint notifications_previous_notification_id_fkey foreign key (previous_notification_id) references notifications (id),
            constraint notifications_recipient_id_fkey foreign key (recipient_id) references users (id),
            constraint notifications_sender_id_fkey foreign key (sender_id) references users (id)
    ) tablespace pg_default;

create index if not exists notifications_sender_idx on public.notifications using btree (sender_id) tablespace pg_default;

create index if not exists notifications_recipient_idx on public.notifications using btree (recipient_id) tablespace pg_default;