"use client";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useAccount } from "wagmi";
import TSAlertLoadingError from "../components/TSAlertLoadingError";
import { TSTransparentDashboardGridItem } from "../components/TSDashboardGridItem";
import useZapperAppsBalances from "../hooks/useZapperAppsBalances";
import useZapperTokensBalances from "../hooks/useZapperTokensBalances";
import tradeshareTheme from "../lib/tradeshareTheme";
import { zapperParams } from "../lib/zapper";
import { currencyFormatter } from "../util/formatters";
import { getZapperChartBalancesUSDByChain } from "../util/zapper";

const LABEL_WALLET_BALANCE = "TOTAL WALLET BALANCE";

const SmallerSpan = styled("div")(() => ({
  fontSize: "0.475em",
  display: "inline-block",
  color: tradeshareTheme.palette.primary.light,
  WebkitBackgroundClip: "unset",
  WebkitTextFillColor: "#fff",
  paddingInline: 4,
}));

export default function TotalBalanceWidget() {
  const { address } = useAccount();
  const {
    data: zapperAppsData,
    isLoading: zapperAppsIsLoading,
    error: zapperAppsError,
  } = useZapperAppsBalances(
    address
      ? {
          ...zapperParams,
          ...{ addresses: [address] },
        }
      : null
  );
  const {
    data: zapperTokensData,
    isLoading: zapperTokensIsLoading,
    error: zapperTokensError,
  } = useZapperTokensBalances(
    address
      ? {
          ...zapperParams,
          ...{ addresses: [address] },
        }
      : null
  );

  if (zapperAppsError)
    return <TSAlertLoadingError message={zapperAppsError.message} />;
  if (zapperTokensError)
    return <TSAlertLoadingError message={zapperTokensError.message} />;
  if (zapperAppsIsLoading || zapperTokensIsLoading)
    return <LinearProgress color="primary" />;

  const { series } = getZapperChartBalancesUSDByChain(
    zapperAppsData,
    zapperTokensData
  );

  const totalBalance = series.reduce((acc, curr) => acc + curr, 0.0);
  const formattedBalance = currencyFormatter.format(totalBalance);

  return (
    <TSTransparentDashboardGridItem
      sx={{
        gridColumn: { xs: "span 4", md: "span 2" },
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        overflow: "hidden",
        minWidth: 0,
        py: 4,
      }}
    >
      <Box sx={{ alignItems: "center" }}>
        <Typography
          variant="h2"
          sx={{
            background: "linear-gradient(0deg, #F2F047 10%, #7EE249 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
          }}
        >
          {formattedBalance} <SmallerSpan>USD</SmallerSpan>
        </Typography>
        <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
          {LABEL_WALLET_BALANCE}
        </Typography>
      </Box>
    </TSTransparentDashboardGridItem>
  );
}
