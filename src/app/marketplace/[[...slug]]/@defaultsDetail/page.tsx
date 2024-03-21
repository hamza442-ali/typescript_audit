"use client";

import ModalSlot from "@/app/components/ModalSlot";
import {
  handleSupabaseError,
  useSupabase,
} from "@/app/components/supabaseProvider";
import Item from "@/components/TSDashboardGridItem";
import MarketDataWidgetItem from "@/components/TSMarketDataWidgetItem";
import labels from "@/lib/messages/en.json";
import { Loan } from "@/lib/supabase";
import { percentageFormatter } from "@/util/formatters";
import AttachMoney from "@mui/icons-material/AttachMoney";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import MoneyOffCsredIcon from "@mui/icons-material/MoneyOffCsred";
import Paid from "@mui/icons-material/Paid";
import PendingIcon from "@mui/icons-material/Pending";
import PercentIcon from "@mui/icons-material/Percent";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { useEffect, useState } from "react";
import { MarketPageProps } from "../../types";

export default function Page({ params }: MarketPageProps) {
  const loan_id = params.slug && params.slug[1];

  if (!loan_id || isNaN(loan_id)) return <p>Invalid Loan Identifier</p>;

  const DefaultedLoansPageDetailContent = () => {
    const { supabase, user } = useSupabase();
    const [loan, setLoan] = useState<Loan[]>([]);
    useEffect(() => {
      const fetchLoans = async () => {
        if (!supabase || !user) return;
        const { data, error } = await supabase
          .from("loans")
          .select("*")
          .eq("id", loan_id)
          .filter("is_in_default", "eq", true);

        if (error) {
          handleSupabaseError(error);
          return;
        }

        setLoan(data);
      };

      fetchLoans();
    }, [supabase, user]);

    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          gap: 3,
          mt: 2,
        }}
      >
        {loan.map((loan) => (
          <Item key={loan.id} sx={{ gridColumn: { xs: "span 4" } }}>
            <Card>
              <CardHeader title={labels.Titles.loanDetails} />
              <CardContent>
                <Box
                  key={loan.id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "auto auto auto auto",
                    gap: 3,
                    mt: 2,
                  }}
                >
                  <MarketDataWidgetItem
                    Icon={AttachMoney}
                    title={`Borrow Amount (${loan.borrow_currency})`}
                    text={loan.borrow_amount?.toFixed() || 0}
                  />
                  <MarketDataWidgetItem
                    Icon={Paid}
                    title={`Repay Amount (${loan.borrow_currency})`}
                    text={loan.repay_amount?.toFixed() || 0}
                  />
                  <MarketDataWidgetItem
                    Icon={PercentIcon}
                    title="Annual Rate"
                    text={percentageFormatter.format(
                      loan.interest_rate?.valueOf() || 0
                    )}
                  />
                  <MarketDataWidgetItem
                    Icon={PercentIcon}
                    title="Penalty Rate"
                    text={percentageFormatter.format(
                      loan.penalty_rate?.valueOf() || 0
                    )}
                  />
                  <MarketDataWidgetItem
                    Icon={CurrencyExchangeIcon}
                    title={`Collateral (${loan.collateral_currency})`}
                    text={loan.collateral_amount?.toFixed() || 0}
                  />
                  <MarketDataWidgetItem
                    Icon={TimelapseIcon}
                    title="Duration"
                    text={(loan.duration_days || 0) + " Days"}
                  />
                  <MarketDataWidgetItem
                    Icon={MoneyOffCsredIcon}
                    title="Is Defaulted"
                    text={loan.is_in_default ? "Yes" : "No"}
                  />
                  <MarketDataWidgetItem
                    Icon={PendingIcon}
                    title="Is Pending"
                    text={loan.is_pending ? "Yes" : "No"}
                  />
                </Box>
              </CardContent>
            </Card>
          </Item>
        ))}
      </Box>
    );
  };

  return (
    <ModalSlot title={labels.Titles.loanDetails}>
      <DefaultedLoansPageDetailContent />
    </ModalSlot>
  );
}
