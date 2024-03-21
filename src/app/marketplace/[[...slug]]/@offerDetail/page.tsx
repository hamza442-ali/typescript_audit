"use client";

import ModalSlot from "@/app/components/ModalSlot";
import {
  handleSupabaseError,
  useSupabase,
} from "@/app/components/supabaseProvider";
import Item from "@/components/TSDashboardGridItem";
import MarketDataWidgetItem from "@/components/TSMarketDataWidgetItem";
import labels from "@/lib/messages/en.json";
import { Offer } from "@/lib/supabase";
import { percentageFormatter, rangeformatter } from "@/util/formatters";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoney from "@mui/icons-material/AttachMoney";
import PaymentsIcon from "@mui/icons-material/Payments";
import PercentIcon from "@mui/icons-material/Percent";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { useEffect, useState } from "react";
import { MarketPageProps } from "../../types";

export default function Page({ params }: MarketPageProps) {
  const offer_id = params.slug && params.slug[1];

  if (!offer_id || isNaN(offer_id)) return <p>Invalid Offer Identifier</p>;

  const MarketOffersPageDetailContent = () => {
    const { supabase, user } = useSupabase();
    const [offer, setOffers] = useState<Offer>();
    useEffect(() => {
      const fetchOffers = async () => {
        if (!supabase || !user) return;
        const { data, error } = await supabase
          .from("offers")
          .select("*")
          .eq("id", offer_id)
          .single();

        if (error) {
          handleSupabaseError(error);
          return;
        }

        setOffers(data);
      };

      fetchOffers();
    }, [supabase, user]);

    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          gap: 1,
          mt: 1,
        }}
      >
        {offer && (
          <Item key={offer.id} sx={{ gridColumn: { xs: "span 4" } }}>
            <Card>
              {/* <CardHeader title={labels.Titles.offerDetails} /> */}
              <CardContent>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "auto auto",
                    gap: 3,
                    mt: 2,
                  }}
                >
                  <MarketDataWidgetItem
                    Icon={AttachMoney}
                    title={`Amount (${offer.borrow_currency})`}
                    text={rangeformatter(
                      offer.min_borrow_amount,
                      offer.max_borrow_amount
                    )}
                  />
                  <MarketDataWidgetItem
                    Icon={AttachMoney}
                    title={`Collateral (${offer.collateral_currency})`}
                    text={rangeformatter(
                      offer.min_collateral_amount,
                      offer.max_collateral_amount
                    )}
                  />
                  <MarketDataWidgetItem
                    Icon={PercentIcon}
                    title="Annual Rate"
                    text={rangeformatter(
                      offer.min_interest_rate,
                      offer.max_interest_rate,
                      null,
                      percentageFormatter
                    )}
                  />
                  <MarketDataWidgetItem
                    Icon={PercentIcon}
                    title="Penalty Rate"
                    text={rangeformatter(
                      offer.min_penalty_rate,
                      offer.max_penalty_rate,
                      null,
                      percentageFormatter
                    )}
                  />
                  <MarketDataWidgetItem
                    Icon={TimelapseIcon}
                    title="Loan Duration"
                    text={rangeformatter(
                      offer.min_duration_days,
                      offer.max_duration_days,
                      "days"
                    )}
                  />
                  <MarketDataWidgetItem
                    Icon={ReceiptIcon}
                    title="Installments"
                    text={rangeformatter(
                      offer.min_installments,
                      offer.max_installments
                    )}
                  />
                  <MarketDataWidgetItem
                    Icon={VolunteerActivismIcon}
                    title="Grace Period"
                    text={`${offer.grace_period_days} days`}
                  />
                  {/* <MarketDataWidgetItem
                    Icon={AccountBalanceIcon}
                    title="Lender Fee"
                    text={percentageFormatter.format(
                      offer.lender_fee_percent?.valueOf() || 0
                    )}
                  /> */}
                  <MarketDataWidgetItem
                    Icon={PaymentsIcon}
                    title="Borrower Fee"
                    text={percentageFormatter.format(
                      offer.borrower_fee_percent?.valueOf() || 0
                    )}
                  />
                  {/* <p>Expiration Date: {offer.expiration_date}</p> */}
                </Box>
              </CardContent>
            </Card>
          </Item>
        )}
      </Box>
    );
  };

  return (
    <ModalSlot title={labels.Titles.offerDetails}>
      <MarketOffersPageDetailContent />
    </ModalSlot>
  );
}
