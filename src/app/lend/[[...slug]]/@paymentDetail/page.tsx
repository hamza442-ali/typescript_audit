"use client";

import ModalSlot from "@/app/components/ModalSlot";
import {
  handleSupabaseError,
  useSupabase,
} from "@/app/components/supabaseProvider";
import Item from "@/components/TSDashboardGridItem";
import MarketDataWidgetItem from "@/components/TSMarketDataWidgetItem";
import labels from "@/lib/messages/en.json";
import { Payment } from "@/lib/supabase";
import { dateTimeFormatter } from "@/util/formatters";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import NotesIcon from "@mui/icons-material/Notes";
import Paid from "@mui/icons-material/Paid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { useEffect, useState } from "react";
import { LendPageProps } from "../../types";

export default function Page({ params }: LendPageProps) {
  const payment_id = params.slug && params.slug[3];

  if (!payment_id || isNaN(payment_id)) return <p>Invalid Loan Identifier</p>;

  const PaymentsDetailContent = () => {
    const { supabase, user } = useSupabase();
    const [payments, setPayment] = useState<Payment[]>([]);
    useEffect(() => {
      const fetchPayments = async () => {
        if (!supabase || !user) return;
        const { data, error } = await supabase
          .from("payments")
          .select("*")
          .eq("id", payment_id);

        if (error) {
          handleSupabaseError(error);
          return;
        }

        setPayment(data);
      };

      fetchPayments();
    }, [supabase, user]);

    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: 3,
          mt: 2,
        }}
      >
        <Item sx={{ gridColumn: { xs: "span 4" } }}>
          <Card>
            {/* <CardHeader title={labels.Titles.paymentDetail} /> */}
            <CardContent>
              {payments.map((payment) => (
                <Box
                  key={payment.id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "auto auto",
                    gap:1,
                    mt: 1,
                  }}
                >
                  <MarketDataWidgetItem
                    Icon={EventAvailableIcon}
                    title="Payment Date"
                    text={dateTimeFormatter.format(
                      new Date(payment.created_at)
                    )}
                  />
                  <MarketDataWidgetItem
                    Icon={Paid}
                    title="Payment Amount"
                    text={
                      (payment.payment_amount?.toFixed() || 0) +
                      " " +
                      payment.payment_currency
                    }
                  />
                  {payment.payment_memo && payment.payment_memo.length > 0 && (
                    <MarketDataWidgetItem
                      Icon={NotesIcon}
                      title="Memo"
                      text={payment.payment_memo}
                    />
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Item>
      </Box>
    );
  };

  return (
    <ModalSlot title={labels.Titles.paymentDetail}>
      <PaymentsDetailContent />
    </ModalSlot>
  );
}
