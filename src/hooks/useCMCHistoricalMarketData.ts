import useSWR from 'swr'
import axios, { AxiosResponse, AxiosError } from "axios"
import { handleAxiosClientError } from '../lib/handleAxiosError'
import CoinmarketcapResponse, { CMCHistoricalMarketDataParams } from '../types/coinmarketcap'

const FETCHER_KEY = "/api/ohlcv/historical"

interface CMCHistoricalMarketDataFetcherArgs {
    url: string
    params: CMCHistoricalMarketDataParams
}

const fetcher = async ({url, params}: CMCHistoricalMarketDataFetcherArgs) => {
    return await axios
        .get(url, { params })
        .then((res: AxiosResponse<CoinmarketcapResponse, AxiosError>) => res.data)
    .catch(handleAxiosClientError)
}

export default function useCMCHistoricalMarketData(params: CMCHistoricalMarketDataParams) {
    const { data, isLoading, error } = useSWR(
        {url: FETCHER_KEY, params},
        fetcher
    );

    return {
        data,
        isLoading,
        error
    }
}
