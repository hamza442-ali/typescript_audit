"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import TokenGridPanel from "@/components/TSTokenGridPanel";

export default function Page() {
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="wallet-content-tokens"
        id="wallet-content-tokens-header"
      >
        <Typography variant="h5">Tokens</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TokenGridPanel />
      </AccordionDetails>
    </Accordion>
  );
}
