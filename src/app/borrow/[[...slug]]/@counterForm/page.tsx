"use client";

import ModalSlot from "@/app/components/ModalSlot";
import {
  handleSupabaseError,
  handleSupabaseSuccess,
  useSupabase,
} from "@/app/components/supabaseProvider";
import labels from "@/lib/messages/en.json";
import { CounterOfferInsert } from "@/lib/supabase";
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
import { BorrowPageProps } from "../../types";

const _blankForm: CounterOfferInsert = {
  borrow_amount: 0,
  collateral_amount: 0,
  interest_rate: 0,
  penalty_rate: 0,
  duration_days: 60,
  installments: 0,
  grace_period_days: 0,
  lender_fee_percent: 0,
  borrower_fee_percent: 0,
  // created_at: "NOW()",
  // updated_at: "NOW()",
  counter_status: null,
  expiration_date: null,
};

function CounterOfferForm({ offerId }: { offerId: number }) {
  const { supabase, user } = useSupabase();
  const router = useRouter();

  const formContext = useForm<CounterOfferInsert>({
    defaultValues: _blankForm,
  });

  const onSubmit = async (data: CounterOfferInsert) => {
    if (!supabase || !user) {
      handleSupabaseError("Database connection error - not logged in");
      return;
    }

    const insert = {
      ..._blankForm,
      ...data,
      user_id: user.id,
      offer_id: offerId,
    };

    const { error } = await supabase.from("counteroffers").insert([insert]);
    if (error) {
      handleSupabaseError(error);
      return;
    } else {
      handleSupabaseSuccess("Counteroffer created");
      formContext.reset();
      router.push(`/borrow/offers/${offerId}/counteroffers`);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <FormContainer formContext={formContext} onSuccess={onSubmit}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextFieldElement
              label={"Borrow Amount"}
              name={"borrow_amount"}
              type={"number"}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldElement
              label={"Collateral Amount"}
              name={"collateral_amount"}
              type={"number"}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldElement
              label={"Annual Rate"}
              name={"interest_rate"}
              type={"number"}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldElement
              label={"Penalty Rate"}
              name={"penalty_rate"}
              type={"number"}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldElement
              label={"Installments"}
              name={"installments"}
              type={"number"}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectElement
              label={"Duration"}
              name={"duration_days"}
              options={[
                { id: 30, value: "30", label: "30 Days" },
                { id: 60, value: "60", label: "60 Days" },
                { id: 90, value: "90", label: "90 Days" },
                { id: 180, value: "180", label: "180 Days" },
                { id: 360, value: "360", label: "360 Days" },
              ]}
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            {labels.Buttons.submit}
          </Button>
        </Box>
      </FormContainer>
    </Box>
  );
}

export default function Page({ params }: BorrowPageProps) {
  const offer_id = params.slug && params.slug[1];

  if (!offer_id || isNaN(offer_id)) return <p>Invalid Offer Identifier</p>;
  return (
    <ModalSlot title={labels.Titles.makeCounterOffer}>
      <CounterOfferForm offerId={offer_id} />
    </ModalSlot>
  );
}
