"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";

/*
{
  count: 200,
  next: 'https://cryptopanic.com/api/v1/posts/?auth_token=266c568e45e28b05c604ea2ae6a8457a0fb3be6d&public=true&filter=rising&regions=en&kind=news&currencies=ETH%2CBTC%2CMATIC&page=2',
  previous: null,
  results: [
    {
      kind: 'news',
      domain: 'cointelegraph.com',
      votes: [Object],
      source: [Object],
      title: 'Bitcoin ETFs: A $600B tipping point for crypto',
      published_at: '2023-09-29T17:40:38Z',
      slug: 'Bitcoin-ETFs-A-600B-tipping-point-for-crypto',
      currencies: [Array],
      id: 18938009,
      url: 'https://cryptopanic.com/news/18938009/Bitcoin-ETFs-A-600B-tipping-point-for-crypto',
      created_at: '2023-09-29T17:40:38Z'
    },
  */

const SHOW_MAX_TITLES = 6;

function MarketNews({
  data,
  show_max = SHOW_MAX_TITLES,
}: {
  data: any;
  show_max: number;
}) {
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="portfolio-content-news"
        id="portfolio-content-news-header"
      >
        <Typography variant="h5">Latest News</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {data &&
            Array.isArray(data.results) &&
            data.results.map(
              ({ title, url }: { title: string; url: string }, idx: number) => {
                if (idx >= show_max) return;
                return (
                  <ListItem key={idx} disablePadding disableGutters>
                    <ListItemButton component={NextLink} href={url}>
                      <ListItemText primary={title} />
                    </ListItemButton>
                  </ListItem>
                );
              }
            )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

export default MarketNews;
