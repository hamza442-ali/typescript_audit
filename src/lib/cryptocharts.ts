import { deepmerge } from "deepmerge-ts";
import tradeshareTheme from "./tradeshareTheme";

// @ See: Full Apex Chart options reference: https://apexcharts.com/docs/options
declare type ChartOptions = import("apexcharts").ApexOptions

function getChartConfig(userinput: any, usercoins: any, values: any) {
  var the_categories = null;
  if (usercoins) {
    the_categories = [].concat.apply([], usercoins);
  }
  var options: ChartOptions = {
    chart: {
      id: userinput.chart_id,
      background: "inherit",
      sparkline: {
        enabled: false
      },
      dropShadow: {
        enabled: true
      },
      zoom: {
        enabled: false
      },
      type: "area",
      toolbar: {
        show: false
      }
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: "top",
      onItemClick: {
        toggleDataSeries: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth",
      width: 2
    },
    series: values,
    grid: {
      yaxis: {
        lines: {
          show: false
        }
      },
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    yaxis: {
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    xaxis: {
      labels: {
        format: "dd MMM yyyy",
      },
      type: "datetime",
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: true
      },
      tooltip: {
        enabled: true
      },
      crosshairs: {
        show: false
      }
    },
    tooltip: {
      shared: true,
      x: {
        format: "dd MMM yyyy"
      },
      y: {
        formatter: function (seriesName: number, opt?: any) {
          var seriesIndex = opt.seriesIndex;
          var dataPointIndex = opt.dataPointIndex;
          // if legend disabled, prevent calling data that won't exist
          if (opt.w.config.series[seriesIndex].data[dataPointIndex]) {
            var dollar = Number(
              opt.w.config.series[seriesIndex].data[dataPointIndex].y
            ).toFixed(2);
            return "$" + dollar;
          }
          return ""
        }
      }
    },
    theme: {
      mode: "dark"
    }
  };

  if (userinput.tooltip) {
    if (userinput.tooltip === "priceonly") {
      var simpletooltip = function ({ series, seriesIndex, dataPointIndex, w }: any) {
        return (
          '<div class="arrow_box">' +
          "<span>$" +
          Number(series[seriesIndex][dataPointIndex]) +
          "</span>" +
          "</div>"
        );
      };
      var res = {
        custom: simpletooltip
      };
      options.tooltip = res;
    }
  }

  // if user enables axes view
  if (userinput.axes === true) {
    if (options.chart && options.chart.sparkline) {
      options.chart.sparkline.enabled = false;
    }
    options.yaxis = {
      labels: {
        style: {
          colors: tradeshareTheme.palette.primary.light,
          fontSize: "12px"
        },
        formatter: function (value: number) {
          return "$" + value.toFixed(2);
        }
      },
      axisTicks: {
        show: true,
        color: "#ccc"
      },
      axisBorder: {
        show: true,
        color: "#ccc"
      }
    }
    options.xaxis = {
      type: "category",
      axisTicks: {
        show: true,
        color: "#ccc"
      },
      axisBorder: {
        show: true,
        color: "#ccc"
      },
      labels: {
        hideOverlappingLabels: true,
        style: {
          colors: tradeshareTheme.palette.primary.light,
          fontSize: "12px"
        },
        formatter: function (value: any, timestamp: any, index: any) {
          const options: any = {
            month: "short",
            day: "2-digit"
          };
          return new Date(timestamp).toLocaleDateString("en-US", options);
        }
      },
      tooltip: {
        enabled: false
      }
    }
    options.tooltip = {
      x: {
        formatter: function (value: any, { series, seriesIndex, dataPointIndex, w }: any) {
          var options: any = {
            year: "numeric",
            month: "short",
            day: "2-digit"
          };
          return new Date(value).toLocaleDateString("en-GB", options);
        }
      }
    }
  }
  // end of user updated axes

  if (userinput.options) {
    if (userinput.options.theme) {
      delete options.colors;
    }
    deepmerge(options, userinput.options);
    if (userinput.options.title === true) {
      options.title = { text: the_categories + " price over time" }
    }
  }

  return options;
}

interface CCDataResults {
  x?: any
  y?: any
}

interface CCAPIResults {
  name?: any
  data?: any
}

async function getCryptoCompareData(tickers: any, ccapikey: any, userinput: any) {
  let result: CCAPIResults[] = [];
  function ccfunc(data: any) {
    let ccresult: CCDataResults[] = []
    data.forEach(function (portfolio: { time: any, close: any }) {
      var obj: CCDataResults = {};
      obj["x"] = portfolio.time;
      obj["y"] = portfolio.close;
      ccresult.push(obj);
    });
    return ccresult;
  }
  var lastdays = 30;
  if (userinput.last_days) {
    lastdays = userinput.last_days;
  }
  for (let i = 0; i < tickers.length; i++) {
    var obj: CCAPIResults = {};
    var url =
      "https://min-api.cryptocompare.com/data/histoday?fsym=" +
      tickers[i] +
      "&tsym=USD&limit=" +
      Number(lastdays);
    if (ccapikey) {
      url = url + "&api_key=" + ccapikey;
    }

    var response = await fetch(url).catch(error =>
      console.error("Error:", error)
    );
    var res = await response?.json();
    var tickerhistory = res.Data.slice(1);
    obj["name"] = tickers[i].toString();
    obj["data"] = ccfunc(tickerhistory);
    result.push(obj);
  }
  return result;
}

async function getPortfolioPriceData(tickers: any, userinput: any) {
  var result = [];
  var startdate = Math.round(new Date().getTime() / 1000) - 2592000; //minus 30 days
  var enddate = Math.round(new Date().getTime() / 1000);
  if (userinput.from) {
    startdate = userinput.from;
  }
  if (userinput.to) {
    enddate = userinput.to;
  }
  if (userinput.last_days) {
    var daysbyseconds = userinput.last_days * 86400;
    startdate = enddate - daysbyseconds;
  }
  for (let i = 0; i < tickers.length; i++) {
    var response = await fetch(
      "https://api.iconomi.com/v1/daa/" +
      tickers[i] +
      "/pricehistory?from=" +
      startdate +
      "&to=" +
      enddate
    ).catch(error => console.error("Error:", error));
    var data = await response?.json();
    var theresult = filteredData(data);

    // get latest price and replace today's open price with latest price
    var latestprice = await fetch(
      "https://api.iconomi.com/v1/daa/" + tickers[i] + "/price"
    ).catch(error => console.error("Error:", error));
    var currentprice = await latestprice?.json();
    theresult[theresult.length - 1].y = currentprice.price.toString()

    result.push({ name: tickers[i], data: theresult });
  }
  return result;

  // function to filter daily data only because ICONOMI return random time intervals
  function isStartOfDay(epoch: any) {
    var inputTime = new Date(epoch * 1000).toISOString();
    var startOfDay = new Date(inputTime).setUTCHours(0, 0, 0, 0);
    var epochStartOfDay = Math.round(startOfDay / 1000);
    var result = false;
    if (epoch === epochStartOfDay) {
      result = true;
    }
    return result;
  }

  function filteredData(data: any) {
    var arr: any[] = [];
    data.values.forEach(function (item: any) {
      var dailyValue = isStartOfDay(Number(item.x));
      if (dailyValue) {
        arr.push(item);
      }
    });
    return arr;
  }
}

async function getAllExternalData(
  icoins: any,
  cccoins: any,
  cckey: any,
  customdata: any,
  userinput: any
) {
  var iconomiData = null;
  var cryptocompareData = null;
  if (icoins) {
    iconomiData = await getPortfolioPriceData(icoins, userinput);
  }
  if (cccoins) {
    cryptocompareData = await getCryptoCompareData(cccoins, cckey, userinput);
  }
  var finalresult: any[] = [];

  if (icoins || cccoins) {
    Promise.all([iconomiData, cryptocompareData]).then(function (res) {
      var iconomi = res[0];
      var crypto = res[1];
      var resultObject = null;
      if (iconomi && crypto) {
        resultObject = [...iconomi, ...crypto];
      } else {
        if (iconomi) {
          resultObject = [...iconomi];
        } else {
          resultObject = crypto ? [...crypto] : [];
        }
      }
      finalresult.push(resultObject);
    });
  }

  return finalresult;
}

async function makeDataConsistent(
  usercoins: any,
  userccoins: any,
  cckey: any,
  customdata: any,
  userinput: any
) {
  var get_final_result = await getAllExternalData(
    usercoins,
    userccoins,
    cckey,
    customdata,
    userinput
  );
  var alldata = await get_final_result;
  var formattedArray: any[] = [];
  if (customdata) {
    if (alldata.length > 0) {
      customdata.forEach(function (el: any) {
        alldata[0].push(el);
      });
    } else {
      alldata.push([]);
      customdata.forEach(function (el: any) {
        alldata[0].push(el);
      });
    }
  }
  alldata[0].forEach(function (portfolio: any) {
    var arr: any[] = [];
    var thare = portfolio.data;
    var min = 0;
    var max = 0;
    thare?.forEach(function (item: any) {
      var price = item.y;
      var origprice = thare[0].y;
      var epochTime = item.x * 1000;
      var change = (1 - origprice / price) * 100;
      if (change <= min) {
        min = change;
      }
      if (change >= max) {
        max = change;
      }
      arr.push({
        x: Number(epochTime),
        y: Number(price).toFixed(2),
        change: Number(change)
      });
    });
    formattedArray.push({
      name: portfolio.name,
      data: arr,
      min: Number(min.toFixed(2)),
      max: Number(max.toFixed(2))
    });
  });
  return formattedArray;
}

export { getChartConfig, makeDataConsistent }