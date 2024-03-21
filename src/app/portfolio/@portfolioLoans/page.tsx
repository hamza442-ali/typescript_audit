"use client";

import {
  handleSupabaseError,
  useSupabase,
} from "@/app/components/supabaseProvider";
import LoanListAccordion from "@/components/SBLoansListAccordion";
import { Loan } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Item from "@/components/TSDashboardGridItem";

const LenderLoansListContent = () => {
  const { supabase, user } = useSupabase();
  const router = useRouter();
  const [loans, setLoans] = useState<Loan[]>([]);

  const clickDetailAction = (loan_id: number) => {
    router.push(`/lend/loans/${loan_id}`);
  };

  const clickPaymentAction = (loan_id: number) => {
    router.push(`/lend/loans/${loan_id}/payments`);
  };

  const clickPendingAction = (loan_id: number) => {
    router.push(`/lend/loans/${loan_id}/fund`);
  };

  useEffect(() => {
    const fetchLoans = async () => {
      if (!supabase || !user) return;

      let query = supabase.from("loans").select("*").eq("lender_id", user.id);

      const { data, error } = await query;

      if (error) {
        handleSupabaseError(error);
        return;
      }

      setLoans(data);
    };

    fetchLoans();
  }, [supabase, user]);

  type LoansByStatus = {
    accepted: Loan[];
    active: Loan[];
    default: Loan[];
  };

  // Bucket loans by status
  const loansByStatus: LoansByStatus = loans.reduce(
    (acc, loan) => {
      if (loan.is_pending) {
        acc.accepted.push(loan);
      } else if (loan.is_in_default) {
        acc.default.push(loan);
      } else if (loan.is_active) {
        acc.active.push(loan);
      }
      return acc;
    },
    {
      accepted: [],
      active: [],
      default: [],
    } as LoansByStatus
  );

  return (
    <>
      {loansByStatus.accepted.length > 0 && (
        <Item
          sx={{
            gridColumn: {
              xs: "span 4",
              md: "span 4",
              lg: "span 4",
            },
          }}
        >
          <LoanListAccordion
            title={"Accepted Loans"}
            description={
              "Loans awaiting your loan funds or the borrower's collateral"
            }
            loans={loansByStatus.accepted}
            clickDetailAction={clickDetailAction}
            clickPaymentAction={clickPaymentAction}
            clickPendingAction={clickPendingAction}
            unboxed={true}
          />
        </Item>
      )}

      {loansByStatus.active.length > 0 && (
        <Item
          sx={{
            gridColumn: {
              xs: "span 4",
              md: "span 4",
              lg: "span 4",
            },
          }}
        >
          <LoanListAccordion
            title={"Active Loans"}
            description={"Assets that you are currently lending"}
            loans={loansByStatus.active}
            clickDetailAction={clickDetailAction}
            clickPaymentAction={clickPaymentAction}
            clickPendingAction={clickPendingAction}
            unboxed={true}
          />
        </Item>
      )}

      {loansByStatus.default.length > 0 && (
        <Item
          sx={{
            gridColumn: {
              xs: "span 4",
              md: "span 4",
              lg: "span 4",
            },
          }}
        >
          <LoanListAccordion
            title={"Defaulted Loans"}
            description={"Loans on which your borrower is in default"}
            loans={loansByStatus.default}
            clickDetailAction={clickDetailAction}
            clickPaymentAction={clickPaymentAction}
            clickPendingAction={clickPendingAction}
            unboxed={true}
          />
        </Item>
      )}
    </>
  );
};

export default function Page() {
  return <LenderLoansListContent />;
}
