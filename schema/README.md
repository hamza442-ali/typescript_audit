# Tradeshare Database Schema

This directory contains the database schema for the Tradeshare application.

## Schema

From [GPT Discussion](https://chat.openai.com/share/cdf1b64f-c301-4266-8628-31ecad36583d)

- "PK" stands for Primary Key. A Primary Key is a unique identifier for a record in the table.
- "FK" stands for Foreign Key. A Foreign Key is a field (or collection of fields) in one table, that refers to the Primary Key in another table.
- The table with the foreign key is called the child table, and the table with the primary key is called the referenced or parent table.

```text
users
------
- user_id (PK)
- user_type

offers
------
- offer_id (PK)
- lender_id (FK - users.user_id)
- offered_amount
- proposed_interest_rate
- proposed_term
- offer_date
- offer_status

negotiations
-------------
- negotiation_id (PK)
- offer_id (FK - offers.offer_id)
- borrower_id (FK - users.user_id)
- negotiation_status
- offer_terms
- counteroffer_terms

loans
-----
- loan_id (PK)
- negotiation_id (FK - negotiations.negotiation_id)
- borrower_id (FK - users.user_id)
- final_amount
- final_interest_rate
- final_term
- loan_date
- loan_status
- grace_period
- default_date

collaterals
-----------
- collateral_id (PK)
- loan_id (FK - loans.loan_id)
- collateral_type
- collateral_value
- collateral_status

bids
----
- bid_id (PK)
- loan_id (FK - loans.loan_id)
- bidder_id (FK - users.user_id)
- bid_amount
- bid_date
- bid_status

stakes
------
- stake_id (PK)
- user_id (FK - users.user_id)
- stake_amount
- stake_date
- stake_status

transactions
-------------
- transaction_id (PK)
- user_id (FK - users.user_id)
- transaction_type
- associated_id
- transaction_amount
- transaction_date
```
