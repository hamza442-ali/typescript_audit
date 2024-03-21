import { useSupabase } from "@/app/components/supabaseProvider";
import labels from "@/lib/messages/en.json";
import { Loan } from "@/lib/supabase";
import { gridFormatters } from "@/util/formatters";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import LinearProgress from "@mui/material/LinearProgress";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import StyledDataGrid, {
  GridBox,
  TSGridNoRowsOverlay,
} from "./TSStyledDataGrid";
import { Typography } from "@mui/material";

interface SBLoansListProps {
  loans: Loan[];
  clickDetailAction?: (loan_id: number) => void;
  clickPaymentAction?: (loan_id: number) => void;
  clickPendingAction?: (loan_id: number) => void;
  listOptions?: {
    hideActions?: boolean;
    hideViewAction?: boolean;
    hidePaymentAction?: boolean;
  };
}

const transformLoansToGridRows = (loan: Loan) => {
  return {
    id: loan.id,
    borrow_amount: `${loan.borrow_amount?.toFixed() || 0} ${loan.borrow_currency}`,
    repay_amount: `${loan.repay_amount?.toFixed() || 0} ${loan.borrow_currency}`,
    annual_rate: (loan.interest_rate || 0) * 100,
    collateral: `${loan.collateral_amount?.toFixed() || 0} ${loan.collateral_currency}`,
    duration: `${loan.duration_days || 0} days`,
    // random number between 30-80
    // TODO: replace with actual progress
    progress: loan.is_pending
      ? 0
      : Math.floor(Math.random() * (80 - 30 + 1) + 30),
    actions: {
      lender: loan.lender_id,
      borrower: loan.borrower_id,
      isDefaulted: loan.is_in_default,
      isPending: loan.is_pending,
    },
  };
};

const columnVisibilityModelDefault = {
  borrow_amount: true,
  repay_amount: true,
  annual_rate: true,
  collateral: true,
  duration: true,
  progress: true,
  actions: true,
};

const columnVisibilityModelMD = {
  ...columnVisibilityModelDefault,
  annual_rate: false,
  collateral: false,
};

const columnVisibilityModelXS = {
  ...columnVisibilityModelMD,
  borrow_amount: false,
  duration: false,
};

export default function LoansList({
  loans,
  listOptions,
  clickDetailAction,
  clickPaymentAction,
  clickPendingAction,
}: SBLoansListProps) {
  const theme = useTheme();
  const { user } = useSupabase();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [visibleColumns, setVisibleColumns] = useState(
    columnVisibilityModelDefault
  );

  const { hideActions, hideViewAction, hidePaymentAction } = listOptions || {};

  const [_, setSelectedRow] = useState<Loan | null>(null);

  const columns: GridColDef[] = [
    {
      field: "borrow_amount",
      headerName: "Borrow Amount",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "repay_amount",
      headerName: "Repay Amount",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "annual_rate",
      headerName: "Interest Rate",
      headerAlign: "right",
      align: "right",
      flex: 1,
      valueFormatter: gridFormatters.formatPercentage,
    },
    {
      field: "collateral",
      headerName: "Collateral",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "duration",
      headerName: "Duration",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "progress",
      headerName: "Progress",
      headerAlign: "right",
      align: "right",
      flex: 1,
      renderCell: (params) => {
        const { api, value } = params;
        const thisRow = api.getRow(params.id);
        const { actions } = thisRow;

        if (actions?.isPending)
          return (
            <Typography variant="body2" color="text.secondary">
              Pending
            </Typography>
          );

        return (
          <Box sx={{ width: "100%" }}>
            <LinearProgress
              variant="determinate"
              value={value}
              color={actions?.isDefaulted ? "error" : "primary"}
            />
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "",
      hideSortIcons: true,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      flex:
        listOptions?.hideViewAction || listOptions?.hidePaymentAction ? 1 : 2,
      renderCell: (params) => {
        const { api } = params;
        const thisRow = api.getRow(params.id);
        const { actions } = thisRow;

        const isPending = !!actions?.isPending;

        const onClickDetail = (event: React.SyntheticEvent) => {
          event.stopPropagation();
          setSelectedRow(thisRow);
          clickDetailAction && clickDetailAction(thisRow.id);
        };
        const onClickPayment = (event: React.SyntheticEvent) => {
          event.stopPropagation();
          setSelectedRow(thisRow);
          clickPaymentAction && clickPaymentAction(thisRow.id);
        };

        const onClickPending = (event: React.SyntheticEvent) => {
          event.stopPropagation();
          setSelectedRow(thisRow);
          clickPendingAction && clickPendingAction(thisRow.id);
        };

        if (hideActions) return <></>;

        return (
          <ButtonGroup variant="contained" color="primary" size="small">
            {!hideViewAction && (
              <Button
                onClick={onClickDetail}
                variant="contained"
                color="primary"
              >
                {labels.Buttons.viewDetails}
              </Button>
            )}
            {!hidePaymentAction &&
              !isPending &&
              actions?.borrower === user?.id && (
                <Button
                  onClick={onClickPayment}
                  variant="contained"
                  color="primary"
                >
                  {labels.Buttons.makePayment}
                </Button>
              )}
            {!hidePaymentAction &&
              !isPending &&
              actions?.lender === user?.id && (
                <Button
                  onClick={onClickPayment}
                  variant="contained"
                  color="primary"
                >
                  {labels.Buttons.viewPayments}
                </Button>
              )}
            {isPending && actions?.lender === user?.id && (
              <Button
                onClick={onClickPending}
                variant="contained"
                color="primary"
              >
                {labels.Buttons.loanSendFunds}
              </Button>
            )}
            {isPending && actions?.borrower === user?.id && (
              <Button
                onClick={onClickPending}
                variant="contained"
                color="primary"
              >
                {labels.Buttons.loanSendCollateral}
              </Button>
            )}
          </ButtonGroup>
        );
      },
    },
  ];

  useEffect(() => {
    const showActions = !hideActions;
    setVisibleColumns(
      isFullScreen
        ? { ...columnVisibilityModelDefault, actions: showActions }
        : isMobileScreen
        ? { ...columnVisibilityModelXS, actions: showActions }
        : { ...columnVisibilityModelMD, actions: showActions }
    );
  }, [isFullScreen, isMobileScreen, hideActions]);

  const rows = loans.map(transformLoansToGridRows);

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
}
