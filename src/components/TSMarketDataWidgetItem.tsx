import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ElementType } from "react";
import Item from "../components/TSDashboardGridItem";

interface MarketDataWidgetItemProps {
  Icon: ElementType;
  title: string;
  text?: string | number;
}

export default function MarketDataWidgetItem({
  Icon,
  title,
  text,
}: MarketDataWidgetItemProps) {
  return (
    <Item
      sx={{
        gridColumn: { xs: "span 4", md: "span 2", lg: "span 1" },
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        overflow: "hidden",
        minWidth: 0,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Icon sx={{ mr: 1, pt: "2px" }} />
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Typography variant="h4">{text}</Typography>
    </Item>
  );
}
