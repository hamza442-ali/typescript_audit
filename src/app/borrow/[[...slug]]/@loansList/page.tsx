"use client";

import {
  handleSupabaseError,
  useSupabase,
} from "@/app/components/supabaseProvider";
import LoanListAccordion from "@/components/SBLoansListAccordion";
import { Loan } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BorrowPageProps } from "../../types";

const BorrowerLoansListContent = ({
  selectedLoan,
}: {
  selectedLoan: number | null;
}) => {
  const { supabase, user } = useSupabase();
  const router = useRouter();
  const [loans, setLoans] = useState<Loan[]>([]);

  const clickDetailAction = (loan_id: number) => {
    router.push(`/borrow/loans/${loan_id}`);
  };

  const clickPaymentAction = (loan_id: number) => {
    router.push(`/borrow/loans/${loan_id}/pay`);
  };

  const clickPendingAction = (loan_id: number) => {
    router.push(`/borrow/loans/${loan_id}/collateral`);
  };

  useEffect(() => {
    const fetchLoans = async () => {
      if (!supabase || !user) return;

      let query = supabase.from("loans").select("*");

      if (selectedLoan) {
        query = query.eq("id", selectedLoan);
      } else {
        query = query.eq("borrower_id", user.id);
      }
      const { data, error } = await query;

      if (error) {
        handleSupabaseError(error);
        return;
      }

      setLoans(data);
    };

    fetchLoans();
  }, [supabase, user, selectedLoan]);

  type LoansByStatus = {
    pending: Loan[];
    active: Loan[];
    default: Loan[];
  };

  // Bucket loans by status
  const loansByStatus: LoansByStatus = loans.reduce(
    (acc, loan) => {
      if (loan.is_pending) {
        acc.pending.push(loan);
      } else if (loan.is_in_default) {
        acc.default.push(loan);
      } else if (loan.is_active) {
        acc.active.push(loan);
      }
      return acc;
    },
    {
      pending: [],
      active: [],
      default: [],
    } as LoansByStatus
  );

  return (
    <>
      {loansByStatus.active.length > 0 && (
        <LoanListAccordion
          title={"Borrow: Active Loans"}
          description={"Loan assets that you are currently borrowing"}
          loans={loansByStatus.active}
          clickDetailAction={clickDetailAction}
          clickPaymentAction={clickPaymentAction}
          clickPendingAction={clickPendingAction}
        />
      )}

      {loansByStatus.pending.length > 0 && (
        <LoanListAccordion
          title={"Borrow: Pending Loans"}
          description={
            "Loans that are awaiting funds from the lender or your collateral"
          }
          loans={loansByStatus.pending}
          clickDetailAction={clickDetailAction}
          clickPaymentAction={clickPaymentAction}
          clickPendingAction={clickPendingAction}
        />
      )}

      {loansByStatus.default.length > 0 && (
        <LoanListAccordion
          title={"Borrow: Defaulted Loans"}
          description={"Loans that you have defaulted on"}
          loans={loansByStatus.default}
          clickDetailAction={clickDetailAction}
          clickPaymentAction={clickPaymentAction}
          clickPendingAction={clickPendingAction}
        />
      )}
    </>
  );
};

export default function Page({ params }: BorrowPageProps) {
  const loan_id = (params.slug && params.slug[1]) || null;
  return (
    <>
      <BorrowerLoansListContent selectedLoan={loan_id} />
    </>
  );
}
