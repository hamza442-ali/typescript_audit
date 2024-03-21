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

const DefaultedLoansListContent = () => {
  const { supabase, user } = useSupabase();
  const router = useRouter();
  const [loans, setLoans] = useState<Loan[]>([]);

  const clickDetailAction = (loan_id: number) => {
    router.push(`/marketplace/defaults/${loan_id}`);
  };

  useEffect(() => {
    const fetchLoans = async () => {
      if (!supabase || !user) return;
      const { data, error } = await supabase
        .from("loans")
        .select("*")
        .filter("is_in_default", "eq", true);

      if (error) {
        handleSupabaseError(error);
        return;
      }

      setLoans(data);
    };

    fetchLoans();
  }, [supabase, user]);

  return (
    <LoanListAccordion
      title={labels.Tabs.loansInDefault}
      loans={loans}
      listOptions={{
        hideActions: false,
        hideViewAction: false,
        hidePaymentAction: true,
      }}
      clickDetailAction={clickDetailAction}
    />
  );
};

export default function Page() {
  return <DefaultedLoansListContent />;
}
