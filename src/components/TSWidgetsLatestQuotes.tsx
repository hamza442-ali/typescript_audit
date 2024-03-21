import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { useTheme } from "@mui/material/styles";
// import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GridCellParams, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import clsx from "clsx";
import { useEffect, useState } from "react";
import useTSLatestQuotes from "../hooks/useTSLatestQuotes";
import tradeshareTheme from "../lib/tradeshareTheme";
import { gridFormatters } from "../util/formatters";
import TSAlertLoadingError from "./TSAlertLoadingError";
import StyledDataGrid from "./TSStyledDataGrid";

const cellTextColor = (params: GridCellParams) => {
  if (!params.value) {
    return "";
  }

  return clsx("TSWidgetText", {
    negative: (params.value as number) < 0,
    positive: (params.value as number) >= 0,
  });
};

const columns: GridColDef[] = [
  { field: "name", headerName: "Asset", flex: 1 },
  {
    field: "price",
    headerName: "Price",
    align: "right",
    headerAlign: "right",
    valueFormatter: gridFormatters.formatCurrency,
  },
  {
    field: "market_cap",
    headerName: "Market Capitalization",
    align: "right",
    headerAlign: "right",
    valueFormatter: gridFormatters.formatCurrency,
    flex: 1,
  },
  {
    field: "volume_24h",
    headerName: "24-Hour Trading Volume",
    align: "right",
    headerAlign: "right",
    valueFormatter: gridFormatters.formatCurrency,
    flex: 1,
  },
  {
    field: "percent_change_1h",
    headerName: "1h %",
    align: "right",
    headerAlign: "right",
    valueFormatter: gridFormatters.formatPercentage,
    cellClassName: cellTextColor,
  },
  {
    field: "percent_change_24h",
    headerName: "24h %",
    align: "right",
    headerAlign: "right",
    valueFormatter: gridFormatters.formatPercentage,
    cellClassName: cellTextColor,
  },
  {
    field: "percent_change_7d",
    headerName: "Weekly %",
    align: "right",
    headerAlign: "right",
    valueFormatter: gridFormatters.formatPercentage,
    cellClassName: cellTextColor,
  },
];

const columnVisibilityModelDefault = {
  name: true,
  price: true,
  market_cap: true,
  volume_24h: true,
  percent_change_1h: true,
  percent_change_24h: true,
  percent_change_7d: true,
};

const columnVisibilityModelMD = {
  ...columnVisibilityModelDefault,
  market_cap: false,
  percent_change_1h: false,
  percent_change_24h: false,
};

const columnVisibilityModelXS = {
  ...columnVisibilityModelMD,
  volume_24h: false,
  percent_change_7d: false,
};

export default function TSWidgetsLatestQuotes() {
  const { data, isLoading, error } = useTSLatestQuotes();
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

  if (error) return <TSAlertLoadingError message={error.message} />;
  if (isLoading) return <LinearProgress color="primary" />;

  const quotes = Object.values(data?.data || []);

  const rows: GridRowsProp = quotes.map((item, idx) => {
    const { id, name, symbol, quote } = item[0];
    const {
      price,
      market_cap,
      volume_24h,
      percent_change_1h,
      percent_change_24h,
      percent_change_7d,
    } = quote["USD"];
    return {
      id,
      name: `${name} (${symbol})`,
      price,
      market_cap,
      volume_24h,
      percent_change_1h,
      percent_change_24h,
      percent_change_7d,
    };
  });

  return (
    <Container
      sx={{
        my: 2,
        "& .TSWidgetText.negative": {
          color: tradeshareTheme.palette.error.main,
        },
        "& .TSWidgetText.positive": {
          color: tradeshareTheme.palette.primary.main,
        },
      }}
    >
      {/* <Typography variant={"h6"}>Cryptocurrencies</Typography> */}
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
        // components={{
        //   Toolbar: TSCustomToolbarFilterOnly,
        // }}
        sx={{
          border: "none",
        }}
      />
    </Container>
  );
}
