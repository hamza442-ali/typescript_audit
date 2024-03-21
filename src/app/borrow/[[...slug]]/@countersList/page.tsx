"use client";

import {
  handleSupabaseError,
  handleSupabaseSuccess,
  useSupabase,
} from "@/app/components/supabaseProvider";
import CountersOffersList from "@/components/SBCounterOffersList";
import labels from "@/lib/messages/en.json";
import { CounterOfferJoined } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BorrowPageProps } from "../../types";
import AccordionList from "@/components/SBAccordionList";

const CounterOffersListContent = ({ offerId }: { offerId: number }) => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [counterOffers, setCounterOffers] = useState<CounterOfferJoined[]>([]);

  const clickDetailAction = (offer_id: number, counteroffer_id: number) => {
    router.push(`/borrow/offers/${offer_id}/counteroffers/${counteroffer_id}`);
  };

  const clickAcceptAction = async (counteroffer_id: number) => {
    const counterOffer = counterOffers.find(
      (counterOffer) => counterOffer.id === counteroffer_id
    );
    if (!counterOffer || !supabase) return;

    const counterUserMessage = labels.Notifications.counterOfferAccepted;
    const offerUserMessage = labels.Notifications.counterOfferAccepted;

    const { user_id, offer_id, offer } = counterOffer;

    if (!user_id || !offer_id || !offer?.user_id) {
      handleSupabaseError("Missing data");
      return;
    }

    // Define any additional loan parameters required by counteroffer_accept procedure here
    // For the sake of the example, I'm using placeholder values.
    const loanParams = {
      loan_lender_id: offer.user_id,
      loan_borrower_id: user_id,
      loan_borrow_currency: "USDC", // Placeholder
      loan_collateral_currency: "USDC", // Placeholder
      loan_borrow_amount: 1000, // Placeholder
      loan_collateral_amount: 1000, // Placeholder
      loan_duration_days: 90, // Placeholder
      loan_fee_amount: 10, // Placeholder
      loan_grace_period_days: 30, // Placeholder
      loan_installments: 6, // Placeholder
      loan_interest_rate: 0.05, // Placeholder
      loan_penalty_rate: 0.1, // Placeholder
      loan_remaining_balance: 1000, // Placeholder
      loan_repay_amount: 1050, // Placeholder
      loan_is_active: true,
      loan_is_pending: true,
    };

    const { data, error } = await supabase.rpc("counteroffer_accept", {
      counteroffer_id,
      counteroffer_user_id: user_id,
      counteroffer_user_message: counterUserMessage,
      counteroffer_offer_id: offer_id,
      offer_user_id: offer.user_id,
      offer_user_message: offerUserMessage,
      ...loanParams,
    });

    if (error) {
      handleSupabaseError(error);
      return;
    } else {
      handleSupabaseSuccess("Counter Offer Accepted - Please add collateral");
      router.push(`/borrow/loans/${data.id}/collateral`);
    }
  };

  const clickRejectAction = async (counteroffer_id: number) => {
    const counterOffer = counterOffers.find(
      (counterOffer) => counterOffer.id === counteroffer_id
    );
    if (!counterOffer || !supabase) return;

    const counterUserMessage = labels.Notifications.counterOfferRejected;
    const offerUserMessage = labels.Notifications.counterOfferRejected;

    const { user_id, offer_id, offer } = counterOffer;

    if (!user_id || !offer_id || !offer?.user_id) {
      handleSupabaseError("Missing data");
      return;
    }

    // console.log("Rejecting Counter Offer: ", counterOffer);

    const { error } = await supabase.rpc("counteroffer_reject", {
      counteroffer_id,
      counteroffer_user_id: user_id,
      counteroffer_user_message: counterUserMessage,
      counteroffer_offer_id: offer_id,
      offer_user_id: offer.user_id,
      offer_user_message: offerUserMessage,
    });

    if (error) {
      handleSupabaseError(error);
      return;
    } else {
      handleSupabaseSuccess("Counter Offer Rejected");
      router.push(`/borrow/offers/${offerId}`);
    }
  };

  useEffect(() => {
    const fetchCounterOffers = async () => {
      if (!supabase || !offerId) return;
      const { data, error } = await supabase
        .from("counteroffers")
        .select(`*, offer:offers(user_id)`)
        .eq("offer_id", offerId);

      if (error) {
        handleSupabaseError(error);
        return;
      }

      // console.log("Borrow Counter Offers: ", data);
      setCounterOffers(data);
    };

    fetchCounterOffers();
  }, [supabase, offerId]);

  return (
    <AccordionList
      title={labels.Titles.countersList}
      listElement={
        <CountersOffersList
          counterOffers={counterOffers}
          clickDetailAction={clickDetailAction}
          clickAcceptAction={clickAcceptAction}
          clickRejectAction={clickRejectAction}
        />
      }
    />
  );
};

export default function Page({ params }: BorrowPageProps) {
  const offer_id = params.slug && params.slug[1];
  if (!offer_id || isNaN(offer_id)) return <p>Invalid Offer Identifier</p>;
  return <CounterOffersListContent offerId={offer_id} />;
}
