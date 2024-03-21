"use client";
// React-apexcharts throws windows not found error in NextJs 13. For workaround,
// @see: https://github.com/apexcharts/react-apexcharts/issues/469

import { useEffect, useState } from "react";
import { getChartConfig, makeDataConsistent } from "../lib/cryptocharts";

declare type ChartOptions = import("apexcharts").ApexOptions;

interface TSMarketChartProps {
  token?: string;
  rangeInDays?: number;
}

function TSMarketChart({ token, rangeInDays }: TSMarketChartProps) {
  const [Chart, setChart] = useState<any>();
  const [chartOptions, setChartOptions] = useState<ChartOptions>();
  const hasType = typeof token !== undefined;

  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  useEffect(() => {
    var iticks = null;
    var cticks = [token];
    var alltickers = [token];
    var cryptocompare_key = null;
    var customdata = null;
    // var chartid = null;
    var userinput = {
      axes: true,
      last_days: rangeInDays,
    };
    (async () => {
      const allData = await makeDataConsistent(
        iticks,
        cticks,
        cryptocompare_key,
        customdata,
        userinput
      );
      const opts = getChartConfig(userinput, alltickers, allData);
      setChartOptions(opts);
    })();
  }, [token, rangeInDays]);

  return hasType && chartOptions && Chart ? (
    <Chart
      options={chartOptions}
      series={chartOptions.series}
      type={chartOptions.chart?.type || "area"}
      width="100%"
    />
  ) : (
    <></>
  );
}

export default TSMarketChart;
