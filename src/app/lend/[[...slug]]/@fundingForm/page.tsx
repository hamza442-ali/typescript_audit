"use client";

import ModalSlot from "@/app/components/ModalSlot";
import {
  handleSupabaseError,
  useSupabase,
} from "@/app/components/supabaseProvider";
import Item from "@/components/TSDashboardGridItem";
import labels from "@/lib/messages/en.json";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { parseEther } from "viem";
import {
  useAccount,
  useBalance,
  useFeeData,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { LendPageProps } from "../../types";

const TEMP_NO_PROD_CONTRACT_ADDRESS =
  "0x1d42064Fc4Beb5F8aAF85F4617AE8b3b5B8Bd801"; //UNISWAP - DON'T SEND REAL FUNDS
const USDC_POS_TOKEN_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

interface FundingFormProps {
  to: string;
  amount: string;
  lender_fee: string;
  borrow_amount: string;
}

const FundingForm = ({ loanId }: { loanId: number }) => {
  const { supabase, user } = useSupabase();
  const [to, _] = useState(TEMP_NO_PROD_CONTRACT_ADDRESS);
  const [amount, setAmount] = useState();

  const formContext = useForm<FundingFormProps>({
    defaultValues: {
      to: TEMP_NO_PROD_CONTRACT_ADDRESS,
      amount: "0",
      lender_fee: "0",
      borrow_amount: "0",
    },
  });

  const { config } = usePrepareSendTransaction({
    to: to,
    value: amount ? parseEther(amount) : undefined,
  });

  const { data, sendTransaction } = useSendTransaction(config);

  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const onSubmit = async (data: FundingFormProps) => {
    // console.log("Funding Form Submitted");
    setAmount(amount);
    sendTransaction?.();
  };

  useEffect(() => {
    const fetchLoans = async () => {
      if (!supabase || !user) return;
      const { data, error } = await supabase
        .from("loans")
        .select("*")
        .eq("id", loanId)
        .single();

      if (error) {
        handleSupabaseError(error);
        return;
      }

      const borrow_amount = data.borrow_amount?.valueOf() || 0;
      const lender_fee = borrow_amount * 0.03;
      const amount = borrow_amount + lender_fee;

      formContext.setValue("borrow_amount", borrow_amount.toFixed(2));
      formContext.setValue("lender_fee", lender_fee.toFixed(2));
      formContext.setValue("amount", amount.toFixed(2));
    };

    fetchLoans();
  }, [supabase, user, loanId, formContext]);

  return (
    <FormContainer formContext={formContext} onSuccess={onSubmit}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Typography variant="body1">
            WARNING - DO NOT SEND REAL FUNDS DURING TESTING
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextFieldElement
            inputProps={{
              sx: { textAlign: "right" },
            }}
            label={"Borrow Amount (USDC)"}
            name={"borrow_amount"}
            type={"number"}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldElement
            inputProps={{
              sx: { textAlign: "right" },
            }}
            label={"Tradeshare Fee (3%)"}
            name={"lender_fee"}
            type={"number"}
            disabled
            aria-readonly="true"
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldElement
            inputProps={{
              sx: { textAlign: "right" },
            }}
            label={"Total Amount Due (USDC)"}
            name={"amount"}
            type={"number"}
            disabled
            aria-readonly="true"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {labels.Buttons.loanSendFunds}
          </Button>
          {isSuccess && (
            <div>
              Successfully sent {amount} ether to {to}
              <div>
                <a href={`https://polygonscan.com/tx/${data?.hash}`}>
                  PolygonScan
                </a>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </FormContainer>
  );
};

const FundingFormContent = ({ loanId }: { loanId: number }) => {
  const { data: feeData } = useFeeData({
    formatUnits: "ether",
  });
  const { address } = useAccount();
  const { data: USDCBalance } = useBalance({
    address: address,
    token: USDC_POS_TOKEN_ADDRESS,
  });
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto auto auto auto",
        gap: 3,
        mt: 2,
      }}
    >
      <Item sx={{ gridColumn: { xs: "span 4" } }}>
        <Card>
          {/* <CardHeader
            title={labels.Titles.fundingForm}
            subheader={"Fund your pending loan"}
          /> */}
          <CardContent>
            <FundingForm loanId={loanId} />
            <Typography variant="body1" sx={{ mt: 2 }}>
              {`Your USDC balance: ${USDCBalance?.formatted} USDC`}
            </Typography>
            <Typography variant="body2">
              Estimated Gas Price: {feeData?.formatted.gasPrice || "0"} MATIC
            </Typography>
          </CardContent>
        </Card>
      </Item>
    </Box>
  );
};

export default function Page({ params }: LendPageProps) {
  const loan_id = params.slug && params.slug[1];
  if (!loan_id || isNaN(loan_id)) return <p>Invalid Loan Identifier</p>;
  return (
    <ModalSlot
      title={labels.Titles.fundingForm}
      subtitle={"Fund your pending loan"}
    >
      <FundingFormContent loanId={loan_id} />
    </ModalSlot>
  );
}
