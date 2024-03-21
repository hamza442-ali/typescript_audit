"use client";

import TitlePage from "@/app/components/TSTitlePage";
import { CustomTabPanel } from "@/app/components/tabs";
import { pageInfo } from "@/lib/messages/pages";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MarketLayoutProps } from "../types";

/* This Layout Handles Marketplace Routes
/marketplace
/marketplace/offers (default view)
/marketplace/offers/[id]
/marketplace/offers/[id]/counter
/marketplace/defaults
/marketplace/defaults/[id]
/marketplace/defaults/[id]/bid
*/

export default function Layout({
  children,
  counterForm,
  defaultsBidForm,
  defaultsDetail,
  defaultsList,
  offerDetail,
  offersList,
  params,
}: MarketLayoutProps) {
  const [slug, slug_id, action] = params.slug || ["offers", undefined, ""];

  const router = useRouter();
  const [selectedTab] = useState(() => {
    return slug === "defaults" ? 1 : 0;
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const newRoute =
      newValue === 0 ? "/marketplace/offers" : "/marketplace/defaults";
    router.push(newRoute);
  };

  return (
    <TitlePage
      title={pageInfo.marketplace.title}
      subtitle={pageInfo.marketplace.subtitle}
    >
      <div>{children}</div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="marketplace tabs"
          >
            <Tab label={"Loan Offers"} />
            <Tab label={"Loans Pending Default"} />
          </Tabs>
        </Box>
        <CustomTabPanel value={selectedTab} index={0}>
          {slug === "offers" && (
            <>
              {offersList}
              {slug_id && !action && offerDetail}
              {slug_id && action === "counter" && counterForm}
            </>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={selectedTab} index={1}>
          {slug === "defaults" && (
            <>
              {defaultsList}
              {slug_id && !action && defaultsDetail}
              {slug_id && action === "bid" && defaultsBidForm}
            </>
          )}
        </CustomTabPanel>
      </Box>
    </TitlePage>
  );
}
