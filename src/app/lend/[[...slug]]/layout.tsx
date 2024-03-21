"use client";

import TitlePage from "@/app/components/TSTitlePage";
import { CustomTabPanel } from "@/app/components/tabs";
import labels from "@/lib/messages/en.json";
import { pageInfo } from "@/lib/messages/pages";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LendLayoutProps } from "../types";

/* This Layout Handles Lender Routes
/lend
/lend/loans - list my lender loans
/lend/loans/[id] - loan [id] detail view
/lend/loans/[id]/fund - send initial loan assets to the pending loan
/lend/loans/[id]/payments - loan [id] list payments
/lend/loans/[id]/payment/[id] - loan [id] payment [id] detail
/lend/defaults - list my loans pending default
*/

const pageLabels = {
  ...labels,
  Tabs: {
    activeLoans: "My Lending",
    pendingDefault: "Loans Pending Default",
  },
};

export default function Layout({
  children,
  fundingForm,
  loanDetail,
  loansList,
  paymentDetail,
  paymentsList,
  params,
}: LendLayoutProps) {
  const [slug, slug_id, action, action_id] = params.slug || [
    "loans",
    undefined,
    "",
    undefined,
  ];

  const router = useRouter();
  const [selectedTab] = useState(() => {
    return slug === "defaults" ? 1 : 0;
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    const newRoute = newValue === 0 ? "/lend/loans" : "/lend/defaults";
    router.push(newRoute);
  };

  return (
    <TitlePage title={pageInfo.lend.title} subtitle={pageInfo.lend.subtitle}>
      <div>{children}</div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="lend tabs"
          >
            <Tab label={pageLabels.Tabs.activeLoans} />
            <Tab label={pageLabels.Tabs.pendingDefault} />
          </Tabs>
        </Box>
        <CustomTabPanel value={selectedTab} index={0}>
          {slug === "loans" && (
            <>
              {!action && loansList}
              {slug_id && !action && loanDetail}
              {action === "fund" && (
                <>
                  {loansList}
                  {fundingForm}
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
          {slug === "defaults" && loansList}
        </CustomTabPanel>
      </Box>
    </TitlePage>
  );
}
