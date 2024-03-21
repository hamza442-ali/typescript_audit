type CMCIntervalOptions =
    "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "1h" | "2h" | "3h" | "4h" | "6h" | "12h" | "1d" | "2d" | "3d" | "7d" | "14d" | "15d" | "30d" | "60d" | "90d" | "365d"

export interface CMCHistoricalMarketDataParams {
    id?: string
    slug?: string
    symbol?: string
    time_period: "daily" | "hourly"
    time_start?: string
    time_end?: string
    count?: number
    interval?: CMCIntervalOptions
    convert?: string
    convert_id?: string
    skip_invalid?: boolean
}

interface CoinmarketcapResponseStatus {
    timestamp: string
    error_code: number
    error_message: string
    elapsed: number
    credit_count: number
}

interface CoinmarketcapDataQuote {
    [key: string]: {
        id: number
        name: string
        symbol: string
        slug: string
        is_active: 0 | 1
        is_fiat: 0 | 1
        cmc_rank: number
        num_market_pairs: number
        circulating_supply: number
        total_supply: number
        market_cap_by_total_supply: number
        max_supply: number
        date_added: string
        tags: [{
            slug: string
            name: string
            category: string
        }]
        platform: null | {
            id: number
            name: string
            symbol: string
            slug: string
            token_address: string
        }
        last_updated: string
        self_reported_circulating_supply: number
        self_reported_market_cap: number
        quote: {
            [key: string]: {
                price: number
                volume_24h: number
                volume_change_24h: number
                percent_change_1h: number
                percent_change_24h: number
                percent_change_7d: number
                percent_change_30d: number
                percent_change_60d: number
                percent_change_90d: number
                market_cap: number
                market_cap_dominance: number
                fully_diluted_market_cap: number
                tvl: number,
                last_updated: string
            }
        }
    }[]
}

export interface CoinmarketcapDataMetrics {
    active_cryptocurrencies: number,
    total_cryptocurrencies: number,
    active_market_pairs: number,
    active_exchanges: number,
    total_exchanges: number,
    eth_dominance: number,
    btc_dominance: number,
    eth_dominance_yesterday: number,
    btc_dominance_yesterday: number,
    eth_dominance_24h_percentage_change: number,
    btc_dominance_24h_percentage_change: number,
    defi_volume_24h: number,
    defi_volume_24h_reported: number,
    defi_market_cap: number,
    defi_24h_percentage_change: number,
    stablecoin_volume_24h: number,
    stablecoin_volume_24h_reported: number,
    stablecoin_market_cap: number,
    stablecoin_24h_percentage_change: number,
    derivatives_volume_24h: number,
    derivatives_volume_24h_reported: number,
    derivatives_24h_percentage_change: number,
    quote: {
        USD: {
            total_market_cap: number
            total_volume_24h: number
            total_volume_24h_reported: number
            altcoin_volume_24h: number
            altcoin_volume_24h_reported: number
            altcoin_market_cap: number
            defi_volume_24h: number
            defi_volume_24h_reported: number
            defi_24h_percentage_change: number
            defi_market_cap: number
            stablecoin_volume_24h: number
            stablecoin_volume_24h_reported: number
            stablecoin_24h_percentage_change: number
            stablecoin_market_cap: number
            derivatives_volume_24h: number
            derivatives_volume_24h_reported: number
            derivatives_24h_percentage_change: number
            total_market_cap_yesterday: number
            total_volume_24h_yesterday: number
            total_market_cap_yesterday_percentage_change: number
            total_volume_24h_yesterday_percentage_change: number
            last_updated: string
        }
    },
    last_updated: string
}

export interface CoinmarketcapMetricsResponse {
    status: CoinmarketcapResponseStatus
    data: CoinmarketcapDataMetrics
}

export default interface CoinmarketcapResponse {
    status: CoinmarketcapResponseStatus
    data: CoinmarketcapDataQuote
}