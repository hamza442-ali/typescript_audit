"use client";

import TitlePage from "@/app/components/TSTitlePage";
import { CustomTabPanel } from "@/app/components/tabs";
import { pageInfo } from "@/lib/messages/pages";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BorrowLayoutProps } from "../types";

/* This Layout Handles Borrower Routes
/borrow
/borrow/loans - list my borrower loans
/borrow/loans/[id] - loan [id] detail view
/borrow/loans/[id]/collateral - send initial collateral to the pending loan
/borrow/loans/[id]/pay - loan [id] payment form
/borrow/loans/[id]/payments - loan [id] list payments
/borrow/loans/[id]/payments/[id] - loan [id] payment [id] detail

/borrow/offers - list my borrower offers
/borrow/offers/-1/new - new borrower offer form
/borrow/offers/[id] - offer [id] detail
/borrow/offers/[id]/counter - offer [id] new counter offer form
/borrow/offers/[id]/counteroffers - offer [id] counteroffers
/borrow/offers/[id]counteroffers/[id] - offer [id] counteroffer [id] detail view / update form
*/
export default function Layout({
  children,
  collateralForm,
  counterDetailForm,
  counterForm,
  countersList,
  loanDetail,
  loansList,
  offerDetail,
  offerForm,
  offersList,
  paymentDetail,
  paymentForm,
  paymentsList,
  params,
}: BorrowLayoutProps) {
  const [slug, slug_id, action, action_id] = params.slug || [
    "loans",
    undefined,
    "",
    undefined,
  ];

  const router = useRouter();
  const [selectedTab] = useState(() => {
    return slug === "offers" ? 1 : 0;
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    const newRoute = newValue === 1 ? "/borrow/offers" : "/borrow/loans";
    router.push(newRoute);
  };

  return (
    <TitlePage
      title={pageInfo.borrow.title}
      subtitle={pageInfo.borrow.subtitle}
    >
      <div>{children}</div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="borrow tabs"
          >
            <Tab label={"My Borrowing"} />
            <Tab label={"My Loan Requests"} />
          </Tabs>
        </Box>
        <CustomTabPanel value={selectedTab} index={0}>
          {slug === "loans" && (
            <>
              {!action && loansList}
              {slug_id && !action && loanDetail}
              {action === "collateral" && (
                <>
                  {loansList}
                  {collateralForm}
                </>
              )}
              {action === "pay" && (
                <>
                  {paymentsList}
                  {paymentForm}
                </>
              )}
              {action === "payments" && (
                <>
                  {paymentsList}
                  {action_id && paymentDetail}
                </>
              )}
            </>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={selectedTab} index={1}>
          {slug === "offers" && (
            <>
              {!action && offersList}
              {slug_id && !action && offerDetail}
              {action === "counter" && (
                <>
                  {offersList}
                  {counterForm}
                </>
              )}
              {action === "counteroffers" && (
                <>
                  {countersList}
                  {action_id && counterDetailForm}
                </>
              )}
              {action === "new" && (
                <>
                  {offersList}
                  {offerForm}
                </>
              )}
            </>
          )}
        </CustomTabPanel>
      </Box>
    </TitlePage>
  );
}
