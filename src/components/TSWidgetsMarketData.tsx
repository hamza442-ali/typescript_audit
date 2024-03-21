import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import TSMarketChart from "./TSMarketChart";

const DEFAULT_TOKEN = "MATIC";
const DEFAULT_DAYS = 7;

const CHART_IDS = ["MATIC", "BTC", "ETH", "USDC"];
const CHART_DAY_RANGES = [7, 30];

const MarketSelect = ({
  token = DEFAULT_TOKEN,
  onChange,
}: {
  token: string;
  onChange: (event: SelectChangeEvent) => void;
}) => (
  <Box sx={{ mx: 2 }}>
    <FormControl size="small">
      <InputLabel id="ts-widgets-market-data-select-label">Token</InputLabel>
      <Select
        labelId="ts-widgets-market-data-select-label"
        id="ts-widgets-market-data-select"
        value={token}
        label="Token"
        onChange={onChange}
      >
        {CHART_IDS.map((tokenValue, idx) => {
          return (
            <MenuItem key={idx} value={tokenValue}>
              {tokenValue}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  </Box>
);

const DayRangeSelect = ({
  rangeInDays = DEFAULT_DAYS,
  onChange,
}: {
  rangeInDays: number;
  onChange: (event: SelectChangeEvent) => void;
}) => (
  <Box sx={{ mx: 2 }}>
    <FormControl size="small">
      <InputLabel id="ts-widgets-market-days-select-label">
        Date Range
      </InputLabel>
      <Select
        labelId="ts-widgets-market-days-select-label"
        id="ts-widgets-market-days-select"
        value={rangeInDays.toString()}
        label="Range"
        onChange={onChange}
      >
        {CHART_DAY_RANGES.map((dayValue, idx) => {
          return (
            <MenuItem key={idx} value={dayValue}>
              {dayValue}-days
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  </Box>
);

const TSWidgetsMarketData = () => {
  const [token, setToken] = useState<string>(DEFAULT_TOKEN);
  const [rangeInDays, setRangeInDays] = useState<number>(DEFAULT_DAYS);

  const handleTokenChange = (event: SelectChangeEvent) => {
    setToken(event.target.value);
  };

  const handleRangeUpdate = (event: SelectChangeEvent) => {
    setRangeInDays(parseInt(event.target.value, 10));
  };

  return (
    <Stack
      spacing={2}
      height="100%"
      sx={{ py: 2, minWidth: { xs: "230px", sm: "400px", lg: "550px" } }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="h6"
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          View Markets
        </Typography>
        <Box display="flex">
          <MarketSelect token={token} onChange={handleTokenChange} />
          <DayRangeSelect
            rangeInDays={rangeInDays}
            onChange={handleRangeUpdate}
          />
        </Box>
      </Box>
      <Box
        sx={{
          minHeight: { xs: 166, sm: 323 },
        }}
      >
        <TSMarketChart token={token} rangeInDays={rangeInDays} />
      </Box>
    </Stack>
  );
};

export default TSWidgetsMarketData;
