import useSWR from 'swr'
import axios, { AxiosResponse, AxiosError } from "axios"
import { handleAxiosClientError } from '../lib/handleAxiosError'
import { CoinmarketcapMetricsResponse } from '../types/coinmarketcap'

const FETCHER_KEY = "/api/global-metrics"

const fetcher = async (url: string) => {
    return await axios
        .get(url)
        .then((res: AxiosResponse<CoinmarketcapMetricsResponse, AxiosError>) => res.data)
        .catch(handleAxiosClientError)
}

export default function useCMCGlobalMetrics() {
    const { data, isLoading, error } = useSWR(
        FETCHER_KEY,
        fetcher
    );

    return {
        data,
        isLoading,
        error
    }
}
