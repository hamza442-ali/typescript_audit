"use client";

import {
  handleSupabaseError,
  useSupabase,
} from "@/app/components/supabaseProvider";
import AccordionList from "@/components/SBAccordionList";
import OffersList from "@/components/SBOffersList";
import { Offer } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MarketPageProps } from "../../types";

const MarketOffersListContent = () => {
  const { supabase, user } = useSupabase();
  const router = useRouter();
  const [offers, setOffers] = useState<Offer[]>([]);

  const clickDetailAction = (offer_id: number) => {
    router.push(`/marketplace/offers/${offer_id}`);
  };

  const clickCounterAction = (offer_id: number) => {
    router.push(`/marketplace/offers/${offer_id}/counter`);
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
        .eq("offer_type", "BORROW")
        .neq("user_id", user.id);

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
      title={"All Loan Offers"}
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

export default function Page({ params }: MarketPageProps) {
  return <MarketOffersListContent />;
}
