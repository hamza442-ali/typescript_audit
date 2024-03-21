"use client";

import AppsGridPanel from "@/components/TSAppsGridPanel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

export default function Page() {
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="wallet-content-apps"
        id="wallet-content-apps-header"
      >
        <Typography variant="h5">Apps</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <AppsGridPanel />
      </AccordionDetails>
    </Accordion>
  );
}
