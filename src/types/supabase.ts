export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      counteroffers: {
        Row: {
          borrow_amount: number | null
          borrower_fee_percent: number | null
          collateral_amount: number | null
          counter_status: string | null
          created_at: string
          duration_days: number | null
          expiration_date: string | null
          grace_period_days: number | null
          id: number
          installments: number | null
          interest_rate: number | null
          lender_fee_percent: number | null
          offer_id: number | null
          penalty_rate: number | null
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          borrow_amount?: number | null
          borrower_fee_percent?: number | null
          collateral_amount?: number | null
          counter_status?: string | null
          created_at?: string
          duration_days?: number | null
          expiration_date?: string | null
          grace_period_days?: number | null
          id?: never
          installments?: number | null
          interest_rate?: number | null
          lender_fee_percent?: number | null
          offer_id?: number | null
          penalty_rate?: number | null
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          borrow_amount?: number | null
          borrower_fee_percent?: number | null
          collateral_amount?: number | null
          counter_status?: string | null
          created_at?: string
          duration_days?: number | null
          expiration_date?: string | null
          grace_period_days?: number | null
          id?: never
          installments?: number | null
          interest_rate?: number | null
          lender_fee_percent?: number | null
          offer_id?: number | null
          penalty_rate?: number | null
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "counteroffers_offer_id_fkey"
            columns: ["offer_id"]
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "counteroffers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      loans: {
        Row: {
          borrow_amount: number | null
          borrow_currency: string | null
          borrower_fee_balance: number | null
          borrower_fee_percent: number | null
          borrower_id: number | null
          collateral_amount: number | null
          collateral_currency: string | null
          collateral_received: boolean | null
          created_at: string
          duration_days: number | null
          fee_amount: number | null
          funding_expires_at: string | null
          grace_period_days: number | null
          id: number
          installments: number | null
          interest_rate: number | null
          is_active: boolean | null
          is_in_default: boolean | null
          is_in_grace_period: boolean | null
          is_pending: boolean | null
          last_payment_amount: number | null
          last_payment_date: string | null
          lender_fee_balance: number | null
          lender_fee_percent: number | null
          lender_id: number | null
          loan_contract_address: string | null
          loan_funds_received: boolean | null
          minimum_payment_amount: number | null
          next_payment_due_date: string | null
          penalty_rate: number | null
          remaining_balance: number | null
          repay_amount: number | null
          updated_at: string
        }
        Insert: {
          borrow_amount?: number | null
          borrow_currency?: string | null
          borrower_fee_balance?: number | null
          borrower_fee_percent?: number | null
          borrower_id?: number | null
          collateral_amount?: number | null
          collateral_currency?: string | null
          collateral_received?: boolean | null
          created_at?: string
          duration_days?: number | null
          fee_amount?: number | null
          funding_expires_at?: string | null
          grace_period_days?: number | null
          id?: never
          installments?: number | null
          interest_rate?: number | null
          is_active?: boolean | null
          is_in_default?: boolean | null
          is_in_grace_period?: boolean | null
          is_pending?: boolean | null
          last_payment_amount?: number | null
          last_payment_date?: string | null
          lender_fee_balance?: number | null
          lender_fee_percent?: number | null
          lender_id?: number | null
          loan_contract_address?: string | null
          loan_funds_received?: boolean | null
          minimum_payment_amount?: number | null
          next_payment_due_date?: string | null
          penalty_rate?: number | null
          remaining_balance?: number | null
          repay_amount?: number | null
          updated_at?: string
        }
        Update: {
          borrow_amount?: number | null
          borrow_currency?: string | null
          borrower_fee_balance?: number | null
          borrower_fee_percent?: number | null
          borrower_id?: number | null
          collateral_amount?: number | null
          collateral_currency?: string | null
          collateral_received?: boolean | null
          created_at?: string
          duration_days?: number | null
          fee_amount?: number | null
          funding_expires_at?: string | null
          grace_period_days?: number | null
          id?: never
          installments?: number | null
          interest_rate?: number | null
          is_active?: boolean | null
          is_in_default?: boolean | null
          is_in_grace_period?: boolean | null
          is_pending?: boolean | null
          last_payment_amount?: number | null
          last_payment_date?: string | null
          lender_fee_balance?: number | null
          lender_fee_percent?: number | null
          lender_id?: number | null
          loan_contract_address?: string | null
          loan_funds_received?: boolean | null
          minimum_payment_amount?: number | null
          next_payment_due_date?: string | null
          penalty_rate?: number | null
          remaining_balance?: number | null
          repay_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "loans_borrower_id_fkey"
            columns: ["borrower_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loans_lender_id_fkey"
            columns: ["lender_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          archived_at: string | null
          content: string | null
          created_at: string
          deleted_at: string | null
          id: number
          previous_notification_id: number | null
          read_at: string | null
          recipient_id: number | null
          sender_id: number | null
        }
        Insert: {
          archived_at?: string | null
          content?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: never
          previous_notification_id?: number | null
          read_at?: string | null
          recipient_id?: number | null
          sender_id?: number | null
        }
        Update: {
          archived_at?: string | null
          content?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: never
          previous_notification_id?: number | null
          read_at?: string | null
          recipient_id?: number | null
          sender_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_previous_notification_id_fkey"
            columns: ["previous_notification_id"]
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_recipient_id_fkey"
            columns: ["recipient_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_sender_id_fkey"
            columns: ["sender_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      offers: {
        Row: {
          borrow_currency: string | null
          borrower_fee_percent: number | null
          collateral_currency: string | null
          created_at: string
          expiration_date: string | null
          grace_period_days: number | null
          id: number
          lender_fee_percent: number | null
          max_borrow_amount: number | null
          max_collateral_amount: number | null
          max_duration_days: number | null
          max_installments: number | null
          max_interest_rate: number | null
          max_penalty_rate: number | null
          min_borrow_amount: number | null
          min_collateral_amount: number | null
          min_duration_days: number | null
          min_installments: number | null
          min_interest_rate: number | null
          min_penalty_rate: number | null
          offer_status: string | null
          offer_type: string | null
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          borrow_currency?: string | null
          borrower_fee_percent?: number | null
          collateral_currency?: string | null
          created_at?: string
          expiration_date?: string | null
          grace_period_days?: number | null
          id?: never
          lender_fee_percent?: number | null
          max_borrow_amount?: number | null
          max_collateral_amount?: number | null
          max_duration_days?: number | null
          max_installments?: number | null
          max_interest_rate?: number | null
          max_penalty_rate?: number | null
          min_borrow_amount?: number | null
          min_collateral_amount?: number | null
          min_duration_days?: number | null
          min_installments?: number | null
          min_interest_rate?: number | null
          min_penalty_rate?: number | null
          offer_status?: string | null
          offer_type?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          borrow_currency?: string | null
          borrower_fee_percent?: number | null
          collateral_currency?: string | null
          created_at?: string
          expiration_date?: string | null
          grace_period_days?: number | null
          id?: never
          lender_fee_percent?: number | null
          max_borrow_amount?: number | null
          max_collateral_amount?: number | null
          max_duration_days?: number | null
          max_installments?: number | null
          max_interest_rate?: number | null
          max_penalty_rate?: number | null
          min_borrow_amount?: number | null
          min_collateral_amount?: number | null
          min_duration_days?: number | null
          min_installments?: number | null
          min_interest_rate?: number | null
          min_penalty_rate?: number | null
          offer_status?: string | null
          offer_type?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "offers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      payments: {
        Row: {
          created_at: string
          id: number
          loan_id: number | null
          payment_amount: number | null
          payment_currency: string | null
          payment_memo: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          loan_id?: number | null
          payment_amount?: number | null
          payment_currency?: string | null
          payment_memo?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          loan_id?: number | null
          payment_amount?: number | null
          payment_currency?: string | null
          payment_memo?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_loan_id_fkey"
            columns: ["loan_id"]
            referencedRelation: "loans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      userprofiles: {
        Row: {
          address_1: string | null
          address_2: string | null
          biography: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          family_name: string | null
          given_name: string | null
          id: number
          kyc_identifier: string | null
          middle_name: string | null
          phone: string | null
          postal_code: string | null
          state_province: string | null
          updated_at: string
          user_id: number
          website: string | null
        }
        Insert: {
          address_1?: string | null
          address_2?: string | null
          biography?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          family_name?: string | null
          given_name?: string | null
          id?: never
          kyc_identifier?: string | null
          middle_name?: string | null
          phone?: string | null
          postal_code?: string | null
          state_province?: string | null
          updated_at?: string
          user_id: number
          website?: string | null
        }
        Update: {
          address_1?: string | null
          address_2?: string | null
          biography?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          family_name?: string | null
          given_name?: string | null
          id?: never
          kyc_identifier?: string | null
          middle_name?: string | null
          phone?: string | null
          postal_code?: string | null
          state_province?: string | null
          updated_at?: string
          user_id?: number
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "userprofiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          address: string
          created_at: string
          id: number
          is_active: boolean | null
          is_admin: boolean | null
          is_verified: boolean | null
          updated_at: string
        }
        Insert: {
          address: string
          created_at?: string
          id?: never
          is_active?: boolean | null
          is_admin?: boolean | null
          is_verified?: boolean | null
          updated_at?: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: never
          is_active?: boolean | null
          is_admin?: boolean | null
          is_verified?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      counteroffer_accept: {
        Args: {
          counteroffer_id: number
          counteroffer_user_id: number
          counteroffer_user_message: string
          counteroffer_offer_id: number
          offer_user_id: number
          offer_user_message: string
          loan_lender_id: number
          loan_borrower_id: number
          loan_borrow_currency: string
          loan_collateral_currency: string
          loan_borrow_amount: number
          loan_collateral_amount: number
          loan_duration_days: number
          loan_fee_amount: number
          loan_grace_period_days: number
          loan_installments: number
          loan_interest_rate: number
          loan_penalty_rate: number
          loan_remaining_balance: number
          loan_repay_amount: number
          loan_is_active: boolean
          loan_is_pending: boolean
        }
        Returns: {
          borrow_amount: number | null
          borrow_currency: string | null
          borrower_fee_balance: number | null
          borrower_fee_percent: number | null
          borrower_id: number | null
          collateral_amount: number | null
          collateral_currency: string | null
          collateral_received: boolean | null
          created_at: string
          duration_days: number | null
          fee_amount: number | null
          funding_expires_at: string | null
          grace_period_days: number | null
          id: number
          installments: number | null
          interest_rate: number | null
          is_active: boolean | null
          is_in_default: boolean | null
          is_in_grace_period: boolean | null
          is_pending: boolean | null
          last_payment_amount: number | null
          last_payment_date: string | null
          lender_fee_balance: number | null
          lender_fee_percent: number | null
          lender_id: number | null
          loan_contract_address: string | null
          loan_funds_received: boolean | null
          minimum_payment_amount: number | null
          next_payment_due_date: string | null
          penalty_rate: number | null
          remaining_balance: number | null
          repay_amount: number | null
          updated_at: string
        }
      }
      counteroffer_reject: {
        Args: {
          counteroffer_id: number
          counteroffer_user_id: number
          counteroffer_user_message: string
          counteroffer_offer_id: number
          offer_user_id: number
          offer_user_message: string
        }
        Returns: string
      }
      upsert_profile: {
        Args: {
          identifier: number
        }
        Returns: {
          address_1: string | null
          address_2: string | null
          biography: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          family_name: string | null
          given_name: string | null
          id: number
          kyc_identifier: string | null
          middle_name: string | null
          phone: string | null
          postal_code: string | null
          state_province: string | null
          updated_at: string
          user_id: number
          website: string | null
        }[]
      }
      upsert_user: {
        Args: {
          eth_address: string
        }
        Returns: {
          address: string
          created_at: string
          id: number
          is_active: boolean | null
          is_admin: boolean | null
          is_verified: boolean | null
          updated_at: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
