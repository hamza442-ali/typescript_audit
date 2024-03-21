"use client";

import ModalSlot from "@/app/components/ModalSlot";
import {
  handleSupabaseError,
  handleSupabaseSuccess,
  useSupabase,
} from "@/app/components/supabaseProvider";
import { makePayment } from "@/app/borrow/actions/payments";
import { BorrowPageProps } from "../../types";
import labels from "@/lib/messages/en.json";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import {
  FormContainer,
  SelectElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";

interface LoanPaymentFormProps {
  payment_amount: number;
  payment_currency: string;
}

const _blankForm: LoanPaymentFormProps = {
  payment_amount: 0,
  payment_currency: "USDC",
};

function LoanPaymentForm({ loanId }: { loanId: number }) {
  const { user } = useSupabase();
  const router = useRouter();

  const formContext = useForm<LoanPaymentFormProps>({
    defaultValues: _blankForm,
  });

  const onSubmit = async (data: LoanPaymentFormProps) => {
    if (!user) {
      handleSupabaseError("Database connection error - not logged in");
      return;
    }

    const payment = {
      ..._blankForm,
      ...data,
      user_id: user.id,
      loan_id: loanId,
    };

    const { result, error } = await makePayment(payment);
    if (error) {
      handleSupabaseError(error);
      return;
    } else {
      // console.log("Make Payment Result: ", result);
      handleSupabaseSuccess("Loan payment initiated");
      formContext.reset();
      router.push(`/borrow/loans/${loanId}/payments`);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <FormContainer formContext={formContext} onSuccess={onSubmit}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6}>
            <SelectElement
              label={"Payment Currency"}
              name={"payment_currency"}
              options={[{ id: "USDC", value: "USDC", label: "USDC" }]}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldElement
              label={"Payment Amount"}
              name={"payment_amount"}
              type={"number"}
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            {labels.Buttons.makePayment}
          </Button>
        </Box>
      </FormContainer>
    </Box>
  );
}

export default function Page({ params }: BorrowPageProps) {
  const loan_id = params.slug && params.slug[1];

  if (!loan_id || isNaN(loan_id)) return <p>Invalid Loan Identifier</p>;

  return (
    <ModalSlot title={labels.Titles.makePayment}>
      <LoanPaymentForm loanId={loan_id} />
    </ModalSlot>
  );
}
