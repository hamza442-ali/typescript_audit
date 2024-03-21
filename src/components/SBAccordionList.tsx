"use client";

import Item from "@/components/TSDashboardGridItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type AccordionListProps = {
  title?: string;
  description?: string;
  listElement: React.ReactNode;
};

export const UnboxedAccordionList = ({
  title,
  description,
  listElement,
}: AccordionListProps) => {
  const kebabCaseTitle = title?.replace(" ", "-").toLowerCase() || "accordion";
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`loan-list-item-content-${kebabCaseTitle}`}
        id={`loan-list-item-content-${kebabCaseTitle}-header`}
      >
        {title && (
          <Typography variant="h5" sx={{ width: "33%", flexShrink: 0 }}>
            {title}
          </Typography>
        )}
        {description && (
          <Typography
            variant="body1"
            sx={{ ml: "auto", mr: 1, pt: 0.5 }}
            color="secondary"
          >
            {description}
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails>{listElement}</AccordionDetails>
    </Accordion>
  );
};

const AccordionList = (props: AccordionListProps) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "auto auto auto auto",
      gap: 3,
      mt: 2,
    }}
  >
    <Item sx={{ gridColumn: { xs: "span 4" } }}>
      <UnboxedAccordionList {...props} />
    </Item>
  </Box>
);

export default AccordionList;
