"use client";

import Box from "@mui/material/Box";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import bgImage from "../../public/trde-bg.png";
import { oswald } from "../lib/tradeshareTheme";
import styles from "../styles/Layout.module.css";
import TSAppBar from "./TSAppBar";
import TSSideBar, { DrawerHeader } from "./TSSideBar";

// DISABLE MODALS FOR NOW
// import dynamic from "next/dynamic";
// import { useAccount } from "wagmi";
// import { useFiatPurchaseContext } from "./TSFiatPurchase/TSFiatPurchaseProvider";
// import { useSwapWidgetContext } from "./TSSwapWidget/TSSwapWidgetProvider";
// const TSModalSwap = dynamic(() => import("./TSSwapWidget/TSModalSwap"));
// const TSModalOnramp = dynamic(() => import("./TSFiatPurchase/TSModalOnramp"));

export default function AppFrame({ children }: PropsWithChildren) {
  const [open, setDrawerOpen] = useState(false);
  // const { isConnected } = useAccount();
  // const { isSwapModalOpen, toggleSwapModal } = useSwapWidgetContext();
  // const { isPurchaseModalOpen, togglePurchaseModal } = useFiatPurchaseContext();

  const toggleDrawer = () => {
    setDrawerOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }} className={oswald.className}>
      <TSAppBar open={open} onClickButton={toggleDrawer} />
      <TSSideBar open={open} onClickButton={toggleDrawer} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <div className={styles.bgWrap}>
          <Image
            alt="Tradeshare Background"
            src={bgImage}
            placeholder="blur"
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
      {/* {isConnected && (
        <>
          <TSModalSwap open={isSwapModalOpen} onClose={toggleSwapModal} />
          <TSModalOnramp
            open={isPurchaseModalOpen}
            onClose={togglePurchaseModal}
          />
        </>
      )} */}
    </Box>
  );
}
