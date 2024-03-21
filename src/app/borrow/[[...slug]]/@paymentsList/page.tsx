"use client";

import {
  handleSupabaseError,
  useSupabase,
} from "@/app/components/supabaseProvider";
import AccordionList from "@/components/SBAccordionList";
import PaymentsList from "@/components/SBPaymentsList";
import labels from "@/lib/messages/en.json";
import { Payment } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BorrowPageProps } from "../../types";

const BorrowerPaymentsListContent = ({ loanId }: { loanId: number }) => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);

  const clickDetailAction = (loan_id: number, payment_id: number) => {
    router.push(`/borrow/loans/${loan_id}/payments/${payment_id}`);
  };

  useEffect(() => {
    const fetchPayments = async () => {
      if (!supabase || !loanId) return;
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .eq("loan_id", loanId);

      if (error) {
        handleSupabaseError(error);
        return;
      }

      setPayments(data);
    };

    fetchPayments();
  }, [supabase, loanId]);

  return (
    <AccordionList
      title={labels.Titles.paymentsList}
      listElement={
        <PaymentsList
          payments={payments}
          clickDetailAction={clickDetailAction}
        />
      }
    />
  );
};

export default function Page({ params }: BorrowPageProps) {
  const loan_id = params.slug && params.slug[1];
  if (!loan_id || isNaN(loan_id)) return <p>Invalid Loan Identifier</p>;
  return <BorrowerPaymentsListContent loanId={loan_id} />;
}
