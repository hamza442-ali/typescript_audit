import { GridValueFormatterParams } from "@mui/x-data-grid";

export const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export const percentageFormatter = new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 2,
});

export const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
});

export const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
});

export const numberFormatter = new Intl.NumberFormat("en-US")

type RangeFormatter = (
    min?: number | string | null,
    max?: number | string | null,
    unit?: string | null,
    formatter?: Intl.NumberFormat | Intl.DateTimeFormat
) => string;

export const rangeformatter: RangeFormatter = (min = 0, max = 0, unit, formatter = numberFormatter) => {
    const int_min = typeof min === 'number' ? min : parseInt(min?.toString() || "0")
    const int_max = typeof max === 'number' ? max : parseInt(max?.toString() || "0")
    const fmt_unit = unit ? " " + unit : ""
    if (int_min === int_max) {
        return formatter.format(int_min) + fmt_unit
    }

    if (int_min > int_max) {
        return formatter.format(int_max) + " - " + formatter.format(int_min) + fmt_unit
    }

    return formatter.format(int_min) + " - " + formatter.format(int_max) + fmt_unit
}

export const gridFormatters = {
    formatCurrency: (params: GridValueFormatterParams) => {
        return currencyFormatter.format(params.value);
    },
    formatPercentage: (params: GridValueFormatterParams) => {
        return percentageFormatter.format(params.value / 100);
    },
    formatTokenPrice: (params: GridValueFormatterParams) => {
        const [price, symbol] = params.value
        const formatted = numberFormatter.format(price)
        return `${formatted} ${symbol}`
    },
    formatNumber: (params: GridValueFormatterParams) => {
        return numberFormatter.format(params.value)
    },
    formatDateTime: (params: GridValueFormatterParams) => {
        return dateTimeFormatter.format(new Date(params.value))
    },
    formatDate: (params: GridValueFormatterParams) => {
        return dateFormatter.format(new Date(params.value))
    },
    toTitleCase: (params: GridValueFormatterParams) => {
        let str = params.value.toString()
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
}

const formatters = {
    currency: currencyFormatter,
    date: dateFormatter,
    dateTime: dateTimeFormatter,
    number: numberFormatter,
    percentage: percentageFormatter,
    range: rangeformatter,
}

export default formatters


