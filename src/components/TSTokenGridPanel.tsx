import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useZapperTokensBalances from "../hooks/useZapperTokensBalances";
import { zapperParams } from "../lib/zapper";
import {ZapperResultV2BalancesTokensPayload} from "../types/zapper";
import { gridFormatters } from "../util/formatters";
import { getZapperTokensBalanceUSD } from "../util/zapper";
import TSAlertLoadingError from "./TSAlertLoadingError";
import StyledDataGrid, { GridBox, GridIcon, TSGridNoRowsOverlay } from "./TSStyledDataGrid";

const columns: GridColDef[] = [
  // {
  //   field: "icon",
  //   hideSortIcons: true,
  //   disableColumnMenu: true,
  //   headerName: "",
  //   sortable: false,
  //   filterable: false,
  //   renderCell: (params) => (
  //     <Box>
  //       <GridIcon src={params.value} alt="icon" width={45} height={45} />
  //     </Box>
  //   ),
  // },
  {
    field: "name",
    headerName: "Asset",
    flex: 1,
  },
  {
    field: "network",
    headerName: "Network",
    valueFormatter: gridFormatters.toTitleCase,
    flex: 1,
  },
  {
    field: "price",
    headerName: "Last Price",
    align: "right",
    headerAlign: "right",
    valueFormatter: gridFormatters.formatCurrency,
    flex: 1,
  },
  {
    field: "balance",
    headerName: "Your Balance",
    align: "right",
    headerAlign: "right",
    valueFormatter: gridFormatters.formatTokenPrice,
    flex: 1,
  },
  {
    field: "total_value",
    headerName: "Value USD",
    align: "right",
    headerAlign: "right",
    valueFormatter: gridFormatters.formatCurrency,
    flex: 1,
  },
  {
    field: "portfolio_percent",
    headerName: "% in Portfolio",
    align: "right",
    headerAlign: "right",
    valueFormatter: gridFormatters.formatPercentage,
    flex: 1,
  },
];

const columnVisibilityModelDefault = {
  // icon: true,
  name: true,
  network: true,
  price: true,
  balance: true,
  total_value: true,
  portfolio_percent: true,
};

const columnVisibilityModelMD = {
  ...columnVisibilityModelDefault,
  network: false,
  portfolio_percent: false,
};

const columnVisibilityModelXS = {
  ...columnVisibilityModelMD,
  price: false,
};

const extractTokenRows = (
  tokens: ZapperResultV2BalancesTokensPayload | undefined,
  totalBalance: number
) => {
  let rows: any = [];
  const values = tokens ? Object.values(tokens).flat() : [];
  values.forEach((item) => {
        const { key, network, token } = item;
        rows.push({
          id: key,
          // icon: displayProps.images[0],
          name: token.name,
          network,
          price: token.price,
          balance: [token.balance, token.symbol],
          total_value: token.balanceUSD,
          portfolio_percent:
            totalBalance === 0
              ? totalBalance
              : (token.balanceUSD / totalBalance) * 100,
        });
      });

  return rows;
};

const TokenGridPanel = () => {
  const { address } = useAccount();
  const {
    data: zapperData,
    isLoading: zapperIsLoading,
    error: zapperError,
  } = useZapperTokensBalances(
    address
      ? {
          ...zapperParams,
          ...{ addresses: [address] },
        }
      : null
  );
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [visibleColumns, setVisibleColumns] = useState(
    columnVisibilityModelDefault
  );

  useEffect(() => {
    setVisibleColumns(
      isFullScreen
        ? columnVisibilityModelDefault
        : isMobileScreen
        ? columnVisibilityModelXS
        : columnVisibilityModelMD
    );
  }, [isFullScreen, isMobileScreen]);

  if (zapperError) return <TSAlertLoadingError message={zapperError.message} />;
  if (zapperIsLoading) return <LinearProgress color="primary" />;

  const totalBalance = getZapperTokensBalanceUSD(zapperData);

  const rows: GridRowsProp = extractTokenRows(zapperData, totalBalance);

  return (
    <GridBox>
      <Box>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          columnVisibilityModel={visibleColumns}
          autoHeight={true}
          density="comfortable"
          hideFooterSelectedRowCount={true}
          hideFooter={true}
          showColumnVerticalBorder={false}
          isRowSelectable={() => false}
          slots={{
            noRowsOverlay: TSGridNoRowsOverlay
          }}
          sx={{
            border: "none",
          }}
        />
      </Box>
    </GridBox>
  );
};

export default TokenGridPanel;
