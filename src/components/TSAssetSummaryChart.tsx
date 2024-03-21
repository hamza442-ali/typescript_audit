"use client";
// React-apexcharts throws windows not found error in NextJs 13. For workaround,
// @see: https://github.com/apexcharts/react-apexcharts/issues/469

import LinearProgress from "@mui/material/LinearProgress";
import Chart from "react-apexcharts";
import { useAccount } from "wagmi";
import { TSTransparentDashboardGridItem } from "../components/TSDashboardGridItem";
import useZapperAppsBalances from "../hooks/useZapperAppsBalances";
import useZapperTokensBalances from "../hooks/useZapperTokensBalances";
import tradeshareTheme from "../lib/tradeshareTheme";
import { zapperParams } from "../lib/zapper";
import { currencyFormatter } from "../util/formatters";
import { getZapperChartBalancesUSDByChain } from "../util/zapper";

const CHART_LABELS = {
  NO_DATA: "No Assets to Display",
};

const FORMATTERS = {
  seriesLabel: (name: string) => name.toLocaleUpperCase().replaceAll("-", " "),
  currencyString: (val: string) => currencyFormatter.format(parseFloat(val)),
  currency: (val: number) => currencyFormatter.format(val),
};

export default function AssetSummaryChart() {
  const { address } = useAccount();
  const { data: zapperAppsData, isLoading: zapperAppsIsLoading } =
    useZapperAppsBalances(
      address
        ? {
            ...zapperParams,
            ...{ addresses: [address] },
          }
        : null
    );
  const { data: zapperTokensData, isLoading: zapperTokensIsLoading } =
    useZapperTokensBalances(
      address
        ? {
            ...zapperParams,
            ...{ addresses: [address] },
          }
        : null
    );

  const {labels, series} = getZapperChartBalancesUSDByChain(
    zapperAppsData,
    zapperTokensData
  );

  const chartData = {
    series,
    options: {
      labels,
      chart: {
        type: "donut",
        background: "none",
        fontFamily: tradeshareTheme.typography.fontFamily,
      } as const,
      theme: {
        mode: "dark",
      } as const,
      colors: [
        "#7ee249",
        "#e2ad49",
        "#e27049",
        "#497ee2",
        "#81d455",
        "#e8b864",
        "#d67451",
        "#6b8fe7",
        "#83c65e",
        "#eec47e",
        "#85b867",
        "#bc7961",
        "#87a1eb",
        "#85aa6e",
        "#f3cf97",
        "#849c75",
        "#b9c5f4",
        "#a07d71",
        "#828e7b",
        "#808080",
      ],
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: true,
          left: 2,
          top: 2,
          opacity: 0.5,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
        },
      },
      stroke: {
        show: false,
      },
      noData: {
        text: CHART_LABELS.NO_DATA,
        style: {
          fontFamily: tradeshareTheme.typography.fontFamily,
          fontSize: "1.4rem",
        },
      },
      tooltip: {
        style: {
          fontFamily: tradeshareTheme.typography.fontFamily,
        },
        y: {
          title: {
            formatter: FORMATTERS.seriesLabel,
          },
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                formatter: FORMATTERS.seriesLabel,
              },
              value: {
                formatter: FORMATTERS.currencyString,
              },
            },
          },
        },
      },
      legend: {
        formatter: FORMATTERS.seriesLabel,
        position: "bottom",
      } as const,
      xaxis: {
        labels: {
          formatter: FORMATTERS.seriesLabel,
        },
      },
      yaxis: {
        labels: {
          formatter: FORMATTERS.currency,
        },
      },
    },
  };

  if (!Chart || zapperAppsIsLoading || zapperTokensIsLoading)
    return <LinearProgress color="primary" />;

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
      <Chart
        options={chartData.options}
        series={chartData.series}
        width="100%"
        height={360}
        type="donut"
        background="transparent"
      />
    </TSTransparentDashboardGridItem>
  );
}
