"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import Item from "@/components/TSDashboardGridItem";
import Grid from "@mui/material/Grid";
import { Theme as SwapTheme, SwapWidget, darkTheme } from "@uniswap/widgets";
import tradeshareTheme from "../../lib/tradeshareTheme";

const swapTheme: SwapTheme = {
  ...darkTheme,
  primary: tradeshareTheme.palette.primary.dark,
};

export default function SwapPage() {
  return (
    <Grid
      container
      spacing={3}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={3} sx={{ mt: 4 }}>
        <Item>
          <ErrorBoundary>
            <SwapWidget
              theme={swapTheme}
              width="100%"
              className="TSSwapWidget"
              hideConnectionUI={true}
            />
          </ErrorBoundary>
        </Item>
      </Grid>
    </Grid>
  );
}
