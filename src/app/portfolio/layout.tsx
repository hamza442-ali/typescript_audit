"use client";

import Item, {
  TSTransparentDashboardGridItem,
} from "@/components/TSDashboardGridItem";
import useZapperAppsBalances from "@/hooks/useZapperAppsBalances";
import useZapperTokensBalances from "@/hooks/useZapperTokensBalances";
import { pageInfo } from "@/lib/messages/pages";
import { zapperParams } from "@/lib/zapper";
import {
  getZapperAppsBalanceUSD,
  getZapperTokensBalanceUSD,
} from "@/util/zapper";
import { EvmAddressish, EvmChain } from "@moralisweb3/common-evm-utils";
import { useEvmWalletNFTs } from "@moralisweb3/next";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useAccount } from "wagmi";
import TitlePage from "../components/TSTitlePage";

type PortfolioLayoutProps = {
  children: React.ReactNode;
  accountBalance: React.ReactNode;
  marketChart: React.ReactNode;
  marketData: React.ReactNode;
  marketNews: React.ReactNode;
  portfolioApps: React.ReactNode;
  portfolioLoans: React.ReactNode;
  portfolioNFTs: React.ReactNode;
  portfolioTokens: React.ReactNode;
  walletBalance: React.ReactNode;
  walletSummary: React.ReactNode;
};

export default function Layout({
  children,
  accountBalance,
  marketChart,
  marketData,
  marketNews,
  portfolioApps,
  portfolioLoans,
  portfolioNFTs,
  portfolioTokens,
  walletBalance,
  walletSummary,
}: PortfolioLayoutProps) {
  const { address } = useAccount();
  const { data: nftData } = useEvmWalletNFTs({
    chain: EvmChain.POLYGON.hex,
    address: address as EvmAddressish,
    normalizeMetadata: true,
  });
  const { data: ethData } = useEvmWalletNFTs({
    chain: EvmChain.ETHEREUM.hex,
    address: address as EvmAddressish,
    normalizeMetadata: true,
  });
  const { data: zapperAppsData } = useZapperAppsBalances(
    address
      ? {
          ...zapperParams,
          ...{ addresses: [address] },
        }
      : null
  );
  const { data: zapperTokensData } = useZapperTokensBalances(
    address
      ? {
          ...zapperParams,
          ...{ addresses: [address] },
        }
      : null
  );
  const hasNFTs = nftData?.length || ethData?.length;
  const hasApps =
    zapperAppsData?.length && getZapperAppsBalanceUSD(zapperAppsData) > 0;
  const hasTokens = zapperTokensData && getZapperTokensBalanceUSD(zapperTokensData) > 0;
  const hasAssets = hasNFTs || hasApps || hasTokens;
  return (
    <TitlePage
      title={pageInfo.portfolio.title}
      subtitle={pageInfo.portfolio.subtitle}
    >
      <div>{children}</div>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          gap: 3,
          mt: 2,
        }}
      >
        <Item
          sx={{
            gridColumn: {
              xs: "span 4",
              md: "span 1",
            },
          }}
        >
          {accountBalance}
        </Item>
        <Item
          sx={{
            gridColumn: {
              xs: "span 4",
              md: "span 3",
              lg: "span 3",
            },
          }}
        >
          {marketChart}
        </Item>
        <TSTransparentDashboardGridItem
          sx={{
            gridColumn: {
              xs: "span 4",
              md: "span 4",
              lg: "span 4",
            },
          }}
        >
          <Typography variant="h4">Portfolio Balances</Typography>
        </TSTransparentDashboardGridItem>
        {walletBalance}
        {walletSummary}
        <TSTransparentDashboardGridItem
          sx={{
            gridColumn: {
              xs: "span 4",
              md: "span 4",
              lg: "span 4",
            },
          }}
        >
          <Typography variant="h4">Your Lending</Typography>
        </TSTransparentDashboardGridItem>
        {portfolioLoans}
        {hasAssets && (
          <TSTransparentDashboardGridItem
            sx={{
              gridColumn: {
                xs: "span 4",
                md: "span 4",
                lg: "span 4",
              },
            }}
          >
            <Typography variant="h4">Your Assets</Typography>
          </TSTransparentDashboardGridItem>
        )}
        {hasTokens && (
          <Item
            sx={{
              gridColumn: {
                xs: "span 4",
                md: "span 4",
                lg: "span 4",
              },
            }}
          >
            {portfolioTokens}
          </Item>
        )}
        {hasApps && (
          <Item
            sx={{
              gridColumn: {
                xs: "span 4",
                md: "span 4",
                lg: "span 4",
              },
            }}
          >
            {portfolioApps}
          </Item>
        )}
        {hasNFTs && (
          <Item
            sx={{
              gridColumn: {
                xs: "span 4",
                md: "span 4",
                lg: "span 4",
              },
            }}
          >
            {portfolioNFTs}
          </Item>
        )}
        <TSTransparentDashboardGridItem
          sx={{
            gridColumn: {
              xs: "span 4",
              md: "span 4",
              lg: "span 4",
            },
          }}
        >
          <Typography variant="h4">Market Data</Typography>
        </TSTransparentDashboardGridItem>
        {marketData}
        <Item
          sx={{
            gridColumn: {
              xs: "span 4",
              md: "span 4",
              lg: "span 4",
            },
          }}
        >
          {marketNews}
        </Item>
      </Box>
    </TitlePage>
  );
}
