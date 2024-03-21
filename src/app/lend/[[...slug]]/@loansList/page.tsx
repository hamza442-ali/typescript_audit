"use client";

import {
  handleSupabaseError,
  useSupabase,
} from "@/app/components/supabaseProvider";
import LoanListAccordion from "@/components/SBLoansListAccordion";
import labels from "@/lib/messages/en.json";
import { Loan } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LendPageProps } from "../../types";

const pageLabels = {
  ...labels,
  Tabs: {
    activeLoans: "Active Loans",
    pendingDefault: "Pending Default",
  }
};

const LenderLoansListContent = ({
  selectedLoan,
  showDefaultsOnly,
}: {
  selectedLoan: number | null;
  showDefaultsOnly: boolean;
}) => {
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

      let query = supabase.from("loans").select("*");

      if (selectedLoan) {
        query = query.eq("id", selectedLoan);
      } else {
        query = query.eq("lender_id", user.id);
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
      {!showDefaultsOnly && loansByStatus.active.length > 0 && (
        <LoanListAccordion
          title={"Active Loans"}
          description={"Assets that you are currently lending"}
          loans={loansByStatus.active}
          clickDetailAction={clickDetailAction}
          clickPaymentAction={clickPaymentAction}
          clickPendingAction={clickPendingAction}
        />
      )}

      {!showDefaultsOnly && loansByStatus.pending.length > 0 && (
        <LoanListAccordion
          title={"Pending Loans"}
          description={
            "Loans awaiting your loan funds or the borrower's collateral"
          }
          loans={loansByStatus.pending}
          clickDetailAction={clickDetailAction}
          clickPaymentAction={clickPaymentAction}
          clickPendingAction={clickPendingAction}
        />
      )}

      {showDefaultsOnly && loansByStatus.default.length > 0 && (
        <LoanListAccordion
          title={"Pending Default"}
          description={"Loans that are within their grace period"}
          loans={loansByStatus.default}
          clickDetailAction={clickDetailAction}
          clickPaymentAction={clickPaymentAction}
          clickPendingAction={clickPendingAction}
        />
      )}
    </>
  );
};

export default function Page({ params }: LendPageProps) {
  const loan_id = (params.slug && params.slug[1]) || null;
  const showDefaultsOnly =
    (params.slug && params.slug[0] === "defaults") || false;
  return (
    <LenderLoansListContent
      selectedLoan={loan_id}
      showDefaultsOnly={showDefaultsOnly}
    />
  );
}
