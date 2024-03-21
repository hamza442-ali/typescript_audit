"use client";

import LoansList from "@/components/SBLoansList";
import { Loan } from "@/lib/supabase";
import AccordionList, {UnboxedAccordionList } from "./SBAccordionList";

type LoanListAccordionProps = {
  title?: string;
  description?: string;
  loans: Loan[];
  listOptions?: {
    hideActions?: boolean;
    hideViewAction?: boolean;
    hidePaymentAction?: boolean;
  };
  clickDetailAction?: (loan_id: number) => void;
  clickPaymentAction?: (loan_id: number) => void;
  clickPendingAction?: (loan_id: number) => void;
  unboxed?: boolean;
};

const LoanListAccordion = ({
  loans,
  title,
  description,
  listOptions,
  clickDetailAction,
  clickPaymentAction,
  clickPendingAction,
  unboxed,
}: LoanListAccordionProps) => {
  const AccordionComponent = unboxed ? UnboxedAccordionList : AccordionList;
  return (
    <AccordionComponent
      title={title}
      description={description}
      listElement={
        <LoansList
          loans={loans}
          listOptions={
            listOptions || {
              hideActions: false,
              hideViewAction: false,
              hidePaymentAction: false,
            }
          }
          clickDetailAction={clickDetailAction}
          clickPaymentAction={clickPaymentAction}
          clickPendingAction={clickPendingAction}
        />
      }
    />
  );
};

export default LoanListAccordion;
