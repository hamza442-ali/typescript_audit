"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import { WagmiConfig } from "wagmi";
import ErrorBoundary from "../components/ErrorBoundary";
import FiatPurchaseProvider from "../components/TSFiatPurchase/TSFiatPurchaseProvider";
import SwapWidgetProvider from "../components/TSSwapWidget/TSSwapWidgetProvider";
import tradeshareTheme from "../lib/tradeshareTheme";
import wagmiConfig, { chains, rainbowKitAppInfo } from "../lib/walletConfig";
import SupabaseProvider from "./components/supabaseProvider";

const rainbowKitTheme = darkTheme({
  overlayBlur: "small",
  accentColor: tradeshareTheme.palette.primary.main,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <SessionProvider>
        <SupabaseProvider>
          <RainbowKitProvider
            appInfo={rainbowKitAppInfo}
            chains={chains}
            theme={rainbowKitTheme}
          >
            <ThemeProvider theme={tradeshareTheme}>
              <CssBaseline />
              <ErrorBoundary>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <SnackbarProvider>
                    <SwapWidgetProvider>
                      <FiatPurchaseProvider>{children}</FiatPurchaseProvider>
                    </SwapWidgetProvider>
                  </SnackbarProvider>
                </LocalizationProvider>
              </ErrorBoundary>
            </ThemeProvider>
          </RainbowKitProvider>
        </SupabaseProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}
