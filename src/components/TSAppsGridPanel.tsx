import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useZapperAppsBalances from "../hooks/useZapperAppsBalances";
import { zapperParams } from "../lib/zapper";
import { ZapperResultV2BalancesApps } from "../types/zapper";
import { gridFormatters } from "../util/formatters";
import { getZapperAppsBalanceUSD } from "../util/zapper";
import TSAlertLoadingError from "./TSAlertLoadingError";
import StyledDataGrid, {
  GridBox,
  GridIcon,
  TSGridNoRowsOverlay,
} from "./TSStyledDataGrid";

const columns: GridColDef[] = [
  {
    field: "icon",
    hideSortIcons: true,
    disableColumnMenu: true,
    headerName: "",
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Box>
        <GridIcon src={params.value} alt="icon" width={45} height={45} />
      </Box>
    ),
  },
  {
    field: "appName",
    headerName: "App",
    flex: 1,
  },
  {
    field: "label",
    headerName: "Asset",
    flex: 1,
  },
  {
    field: "network",
    headerName: "Network",
    flex: 1,
    valueFormatter: gridFormatters.toTitleCase,
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
  icon: true,
  appName: true,
  label: true,
  network: true,
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
  label: false,
};

const extractAppRows = (
  apps: ZapperResultV2BalancesApps[] | undefined,
  totalBalance: number
) => {
  return (
    apps?.map((app) => {
      const { key, appName, appImage, network, balanceUSD } = app;
      return {
        id: key,
        icon: appImage,
        appName,
        label: appName,
        network,
        total_value: balanceUSD,
        portfolio_percent:
          totalBalance === 0 ? totalBalance : (balanceUSD / totalBalance) * 100,
      };
    }) || []
  );
};

const AppsGridPanel = () => {
  const { address } = useAccount();
  const {
    data: zapperData,
    isLoading: zapperIsLoading,
    error: zapperError,
  } = useZapperAppsBalances(
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

  const totalBalance = getZapperAppsBalanceUSD(zapperData);

  const rows: GridRowsProp = extractAppRows(zapperData, totalBalance);

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
            noRowsOverlay: TSGridNoRowsOverlay,
          }}
          sx={{
            border: "none",
          }}
        />
      </Box>
    </GridBox>
  );
};

export default AppsGridPanel;
