import { useSupabase } from "@/app/components/supabaseProvider";
import labels from "@/lib/messages/en.json";
import { CounterOffer } from "@/lib/supabase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GridColDef } from "@mui/x-data-grid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import StyledDataGrid, {
  GridBox,
  TSGridNoRowsOverlay,
} from "./TSStyledDataGrid";
import { set } from "react-hook-form";
import { gridFormatters } from "@/util/formatters";

type LoanEscrowContractArgs = {
  lender: `0x${string}`;
  borrower: `0x${string}`;
  loanAmount: bigint;
  collateralAmount: bigint;
  repayAmount: bigint;
  loanAsset: `0x${string}`;
  collateralAsset: `0x${string}`;
};

interface SBCounterOffersListProps {
  counterOffers: CounterOffer[];
  clickDetailAction?: (offer_id: number, counteroffer_id: number) => void;
  clickAcceptAction?: (
    counteroffer_id: number,
    setContractArgs?: Dispatch<SetStateAction<LoanEscrowContractArgs|undefined>> | undefined,
    setLoanId?: Dispatch<SetStateAction<number|undefined>> | undefined
  ) => void;
  clickRejectAction?: (counteroffer_id: number) => void;
  setContractArgs?: Dispatch<SetStateAction<LoanEscrowContractArgs|undefined>>;
  setLoanId?: Dispatch<SetStateAction<number|undefined>>;
}

/* [
  id,
  user_id,
  offer_id,
  borrow_amount,
  collateral_amount,
  interest_rate,
  penalty_rate,
  duration_days,
  installments,
  grace_period_days,
  lender_fee_percent,
  borrower_fee_percent,
  created_at,
  updated_at,
  counter_status,
  expiration_date,
]
*/

const transformOffersToGridRows = (counterOffer: CounterOffer) => {
  return {
    id: counterOffer.id,
    borrow_amount: `${counterOffer.borrow_amount || 0} USDC`,
    collateral_amount: `${counterOffer.collateral_amount || 0} USDC`,
    interest_rate: (counterOffer.interest_rate || 0) * 100,
    penalty_rate: (counterOffer.penalty_rate || 0) * 100,
    duration_days: `${counterOffer.duration_days || 0} days`,
    installments: counterOffer.installments,
    grace_period_days: `${counterOffer.grace_period_days || 0} days`,
    lender_fee_percent: (counterOffer.lender_fee_percent || 0) * 100,
    borrower_fee_percent: (counterOffer.borrower_fee_percent || 0) * 100,
    counter_status: counterOffer.counter_status,
    expiration_date: counterOffer.expiration_date,
    actions: {
      offer_id: counterOffer.offer_id,
      counter_status: !!counterOffer.counter_status,
    },
  };
};

const columnVisibilityModelDefault = {
  borrow_amount: true,
  collateral_amount: true,
  interest_rate: true,
  penalty_rate: false,
  duration_days: true,
  installments: true,
  grace_period_days: false,
  lender_fee_percent: false,
  borrower_fee_percent: false,
  counter_status: true,
  expiration_date: false,
  actions: true,
};

const columnVisibilityModelMD = {
  ...columnVisibilityModelDefault,
  penalty_rate: false,
  grace_period_days: false,
  lender_fee_percent: false,
  borrower_fee_percent: false,
  actions: true,
};

const columnVisibilityModelXS = {
  ...columnVisibilityModelMD,
  duration_days: true,
  installments: false,
  expiration_date: false,
  actions: true,
};

export default function CounterOffersList({
  counterOffers,
  clickDetailAction,
  clickAcceptAction,
  clickRejectAction,
  setContractArgs,
  setLoanId
}: SBCounterOffersListProps) {
  const theme = useTheme();
  const { user } = useSupabase();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [visibleColumns, setVisibleColumns] = useState(
    columnVisibilityModelDefault
  );

  const [_, setSelectedRow] = useState<CounterOffer | null>(null);

  const columns: GridColDef[] = [
    {
      field: "borrow_amount",
      headerName: "Borrow Amount",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "collateral_amount",
      headerName: "Collateral Amount",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "interest_rate",
      headerName: "Interest Rate",
      headerAlign: "right",
      align: "right",
      flex: 1,
      valueFormatter: gridFormatters.formatPercentage,
    },
    {
      field: "penalty_rate",
      headerName: "Penalty Rate",
      headerAlign: "right",
      align: "right",
      flex: 1,
      valueFormatter: gridFormatters.formatPercentage,
    },
    {
      field: "duration_days",
      headerName: "Duration",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "installments",
      headerName: "Installments",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "grace_period_days",
      headerName: "Grace Period",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    // {
    //   field: "lender_fee_percent",
    //   headerName: "Lender Fee",
    //   headerAlign: "right",
    //   align: "right",
    //   flex: 1,
    //   valueFormatter: gridFormatters.formatPercentage,
    // },
    {
      field: "borrower_fee_percent",
      headerName: "Borrower Fee",
      headerAlign: "right",
      align: "right",
      flex: 1,
      valueFormatter: gridFormatters.formatPercentage,
    },
    {
      field: "expiration_date",
      headerName: "Expiration Date",
      headerAlign: "right",
      align: "right",
      flex: 1,
      valueFormatter: gridFormatters.formatDate,
    },
    {
      field: "counter_status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "",
      hideSortIcons: true,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      flex: 2,
      renderCell: (params) => {
        const { api } = params;
        const thisRow = api.getRow(params.id);
        const { actions } = thisRow;
        const onClickDetail = (event: React.SyntheticEvent) => {
          event.stopPropagation();
          setSelectedRow(thisRow);
          clickDetailAction && clickDetailAction(actions.offer_id, thisRow.id);
        };
        const onClickAcceptAction = (event: React.SyntheticEvent) => {
          event.stopPropagation();
          setSelectedRow(thisRow);
          clickAcceptAction &&
            clickAcceptAction(thisRow.id, setContractArgs, setLoanId);
        };
        const onClickRejectAction = (event: React.SyntheticEvent) => {
          event.stopPropagation();
          setSelectedRow(thisRow);
          clickRejectAction && clickRejectAction(thisRow.id);
        };

        return (
          <>
            {!actions?.counter_status && (
              <ButtonGroup variant="contained" color="primary" size="small">
                <Button
                  onClick={onClickDetail}
                  variant="contained"
                  color="primary"
                >
                  {labels.Buttons.counterOfferViewDetails}
                </Button>
                {actions?.user_id !== user?.id && (
                  <Button
                    onClick={onClickAcceptAction}
                    variant="contained"
                    color="primary"
                  >
                    {labels.Buttons.counterOfferAccept}
                  </Button>
                )}
                {actions?.user_id !== user?.id && (
                  <Button
                    onClick={onClickRejectAction}
                    variant="contained"
                    color="primary"
                  >
                    {labels.Buttons.counterOfferReject}
                  </Button>
                )}
              </ButtonGroup>
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    setVisibleColumns(
      isFullScreen
        ? columnVisibilityModelDefault
        : isMobileScreen
        ? columnVisibilityModelXS
        : columnVisibilityModelMD
    );
  }, [isFullScreen, isMobileScreen]);

  const rows = counterOffers.map(transformOffersToGridRows);

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
