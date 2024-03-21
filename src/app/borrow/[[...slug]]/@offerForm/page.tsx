"use client";

import ModalSlot from "@/app/components/ModalSlot";
import {
  handleSupabaseError,
  handleSupabaseSuccess,
  useSupabase,
} from "@/app/components/supabaseProvider";
// import AccordionList from "@/components/SBAccordionList";
import labels from "@/lib/messages/en.json";
import { OfferInsert } from "@/lib/supabase";
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

const _blankForm: OfferInsert = {
  borrow_currency: "USDC",
  borrower_fee_percent: 1,
  collateral_currency: "USDC",
  created_at: "NOW()",
  expiration_date: null,
  grace_period_days: 30,
  lender_fee_percent: 1,
  max_borrow_amount: 50000,
  max_collateral_amount: 50000,
  max_duration_days: 360,
  max_installments: 12,
  max_interest_rate: 0.05,
  max_penalty_rate: 0.1,
  min_borrow_amount: 50000,
  min_collateral_amount: 50000,
  min_duration_days: 180,
  min_installments: 12,
  min_interest_rate: 0.05,
  min_penalty_rate: 0.1,
  offer_status: "ACTIVE",
  offer_type: "BORROW",
  updated_at: "NOW()",
};

function OfferForm() {
  const { supabase, user } = useSupabase();
  const router = useRouter();

  const formContext = useForm<OfferInsert>({
    defaultValues: _blankForm,
  });

  const onSubmit = async (data: OfferInsert) => {
    if (!supabase || !user) {
      handleSupabaseError("Database connection error - not logged in");
      return;
    }

    const insert = { ..._blankForm, ...data, user_id: user.id };

    const { error } = await supabase.from("offers").insert([insert]);
    if (error) {
      handleSupabaseError(error);
      return;
    } else {
      handleSupabaseSuccess("Offer created");
      formContext.reset();
      router.push(`/borrow/offers`);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <FormContainer formContext={formContext} onSuccess={onSubmit}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6}>
            <SelectElement
              label={"Borrow Currency"}
              name={"borrow_currency"}
              options={[{ id: "USDC", value: "USDC", label: "USDC" }]}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldElement
              label={"Minimum Borrow Amount"}
              name={"min_borrow_amount"}
              type={"number"}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectElement
              label={"Collateral Currency"}
              name={"collateral_currency"}
              options={[{ id: "USDC", value: "USDC", label: "USDC" }]}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldElement
              label={"Maximum Collateral Amount"}
              name={"max_collateral_amount"}
              type={"number"}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldElement
              label={"Max Annual Rate"}
              name={"max_interest_rate"}
              type={"number"}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldElement
              label={"Max Penalty Rate"}
              name={"max_penalty_rate"}
              type={"number"}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldElement
              label={"Min Installments"}
              name={"min_installments"}
              type={"number"}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectElement
              label={"Min Duration"}
              name={"min_duration_days"}
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

export default function Page() {
  return (
    <ModalSlot
      title={"Request a New Loan"}
      subtitle="Add a new loan request to the marketplace."
    >
      <OfferForm />
    </ModalSlot>
  );
}
