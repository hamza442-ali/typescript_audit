"use client";

import Item from "@/components/TSDashboardGridItem";
import MarketDataWidgetItem from "@/components/TSMarketDataWidgetItem";
import TSWidgetsLatestQuotes from "@/components/TSWidgetsLatestQuotes";
import useCMCGlobalMetrics from "@/hooks/useCMCGlobalMetrics";
import {
  currencyFormatter,
  numberFormatter,
  percentageFormatter,
} from "@/util/formatters";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

export default function Page() {
  const { data: metrics } = useCMCGlobalMetrics();
  return (
    <>
      <MarketDataWidgetItem
        Icon={CurrencyExchangeIcon}
        title="# of Currencies"
        text={
          metrics &&
          numberFormatter.format(metrics?.data.total_cryptocurrencies)
        }
      />
      <MarketDataWidgetItem
        Icon={CurrencyExchangeIcon}
        title="Market Capitalization"
        text={
          metrics &&
          currencyFormatter.format(metrics?.data.quote.USD.total_market_cap)
        }
      />
      <MarketDataWidgetItem
        Icon={CurrencyExchangeIcon}
        title="Trading Volume"
        text={
          metrics &&
          currencyFormatter.format(
            metrics.data.quote.USD.total_volume_24h_reported
          )
        }
      />
      <MarketDataWidgetItem
        Icon={CurrencyExchangeIcon}
        title="Bitcoin Dominance"
        text={
          metrics &&
          percentageFormatter.format(metrics.data.btc_dominance / 100)
        }
      />
      <Item sx={{ gridColumn: { xs: "span 4" } }}>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="portfolio-content-quotes"
            id="portfolio-content-quotes-header"
          >
            <Typography variant="h5">Cryptocurrencies</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TSWidgetsLatestQuotes />
          </AccordionDetails>
        </Accordion>
      </Item>
    </>
  );
}
