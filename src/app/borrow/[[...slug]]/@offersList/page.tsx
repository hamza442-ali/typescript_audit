"use client";

import {
  handleSupabaseError,
  useSupabase,
} from "@/app/components/supabaseProvider";
import AccordionList from "@/components/SBAccordionList";
import OffersList from "@/components/SBOffersList";
import labels from "@/lib/messages/en.json";
import { Offer } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BorrowerOffersListContent = () => {
  const { supabase, user } = useSupabase();
  const router = useRouter();
  const [offers, setOffers] = useState<Offer[]>([]);

  const clickDetailAction = (offer_id: number) => {
    router.push(`/borrow/offers/${offer_id}`);
  };

  const clickCounterAction = (offer_id: number) => {
    router.push(`/borrow/offers/${offer_id}/counter`);
  };

  const clickCounterListAction = (offer_id: number) => {
    router.push(`/borrow/offers/${offer_id}/counteroffers`);
  };

  useEffect(() => {
    const fetchOffers = async () => {
      if (!supabase || !user) return;
      const { data, error } = await supabase
        .from("offers")
        .select("*")
        .eq("user_id", user.id)
        .eq("offer_type", "BORROW");

      if (error) {
        handleSupabaseError(error);
        return;
      }

      setOffers(data);
    };

    fetchOffers();
  }, [supabase, user]);

  return (
    <AccordionList
      title={"My Loan Requests"}
      listElement={
        <OffersList
          offers={offers}
          clickDetailAction={clickDetailAction}
          clickCounterAction={clickCounterAction}
          clickCounterListAction={clickCounterListAction}
        />
      }
    />
  );
};

export default function Page() {
  return <BorrowerOffersListContent />;
}
