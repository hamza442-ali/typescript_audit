import { useSupabase } from "@/app/components/supabaseProvider";
import labels from "@/lib/messages/en.json";
import { Offer } from "@/lib/supabase";
import { percentageFormatter, rangeformatter } from "@/util/formatters";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import StyledDataGrid, {
  GridBox,
  TSGridNoRowsOverlay,
} from "./TSStyledDataGrid";

interface SBOffersListProps {
  offers: Offer[];
  clickDetailAction?: (offer_id: number) => void;
  clickCounterAction?: (offer_id: number) => void;
  clickCounterListAction?: (offer_id: number) => void;
}

/* [
  type,
  status,
  borrow currency,
  borrow range,
  collateral currency,
  collateral range,
  interest rate range,
  penalty rate range,
  duration range,
  installments range,
  grace period,
  lender fee percent,
  borrower fee percent,
  expiration date,
  created_at,
  updated_at,
]
*/

const transformOffersToGridRows = (offer: Offer) => {
  const borrowRange = rangeformatter(
    offer.min_borrow_amount,
    offer.max_borrow_amount,
    offer.borrow_currency
  );
  const collateralRange = rangeformatter(
    offer.min_collateral_amount,
    offer.max_collateral_amount,
    offer.collateral_currency
  );
  const interestRateRange = rangeformatter(
    offer.min_interest_rate,
    offer.max_interest_rate,
    null,
    percentageFormatter
  );
  const penaltyRateRange = rangeformatter(
    offer.min_penalty_rate,
    offer.max_penalty_rate,
    null,
    percentageFormatter
  );
  const durationRange = rangeformatter(
    offer.min_duration_days,
    offer.max_duration_days,
    "days"
  );
  const installmentsRange = rangeformatter(
    offer.min_installments,
    offer.max_installments
  );
  return {
    id: offer.id,
    type: offer.offer_type,
    status: offer.offer_status,
    borrow_range: borrowRange,
    collateral_range: collateralRange,
    interest_rate_range: interestRateRange,
    penalty_rate_range: penaltyRateRange,
    duration_range: durationRange,
    installments_range: installmentsRange,
    grace_period: offer.grace_period_days,
    lender_fee_percent: offer.lender_fee_percent,
    borrower_fee_percent: offer.borrower_fee_percent,
    expiration_date: offer.expiration_date,
    created_at: offer.created_at,
    updated_at: offer.updated_at,
    actions: {
      offer: offer.id,
      type: offer.offer_type,
      user_id: offer.user_id,
    },
  };
};

const columnVisibilityModelDefault = {
  type: false,
  status: false,
  borrow_range: true,
  collateral_range: true,
  interest_rate_range: true,
  penalty_rate_range: false,
  duration_range: true,
  installments_range: true,
  grace_period: false,
  lender_fee_percent: false,
  borrower_fee_percent: false,
  expiration_date: false,
  created_at: false,
  updated_at: false,
  actions: true,
};

const columnVisibilityModelMD = {
  ...columnVisibilityModelDefault,
  type: false,
  status: false,
  collateral_range: false,
  penalty_rate_range: false,
  grace_period: false,
  lender_fee_percent: false,
  borrower_fee_percent: false,
  created_at: false,
  updated_at: false,
};

const columnVisibilityModelXS = {
  ...columnVisibilityModelMD,
  duration_range: false,
  installments_range: false,
};

export default function LoansList({
  offers,
  clickDetailAction,
  clickCounterAction,
  clickCounterListAction,
}: SBOffersListProps) {
  const theme = useTheme();
  const { user } = useSupabase();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [visibleColumns, setVisibleColumns] = useState(
    columnVisibilityModelDefault
  );

  const [_, setSelectedRow] = useState<Offer | null>(null);

  const columns: GridColDef[] = [
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "borrow_range",
      headerName: "Borrow Amount",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "collateral_range",
      headerName: "Collateral Amount",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "interest_rate_range",
      headerName: "Interest Rate",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "penalty_rate_range",
      headerName: "Penalty Rate",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "duration_range",
      headerName: "Duration",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "installments_range",
      headerName: "Installments",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "grace_period",
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
    // },
    {
      field: "borrower_fee_percent",
      headerName: "Borrower Fee",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "expiration_date",
      headerName: "Expiration Date",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Created",
      flex: 1,
    },
    {
      field: "updated_at",
      headerName: "Updated",
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
          clickDetailAction && clickDetailAction(thisRow.id);
        };
        const onClickCounterListAction = (event: React.SyntheticEvent) => {
          event.stopPropagation();
          setSelectedRow(thisRow);
          clickCounterListAction && clickCounterListAction(thisRow.id);
        };
        const onClickCounterAction = (event: React.SyntheticEvent) => {
          event.stopPropagation();
          setSelectedRow(thisRow);
          clickCounterAction && clickCounterAction(thisRow.id);
        };

        return (
          <ButtonGroup variant="contained" color="primary" size="small">
            <Button onClick={onClickDetail} variant="contained" color="primary">
              {labels.Buttons.viewDetails}
            </Button>
            {actions?.user_id === user?.id && (
              <Button
                onClick={onClickCounterListAction}
                variant="contained"
                color="primary"
              >
                {labels.Buttons.viewCounterOffers}
              </Button>
            )}
            {actions?.user_id !== user?.id && (
              <Button
                onClick={onClickCounterAction}
                variant="contained"
                color="primary"
              >
                {labels.Buttons.makeCounterOffer}
              </Button>
            )}
          </ButtonGroup>
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

  const rows = offers.map(transformOffersToGridRows);

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
