import useSWR from 'swr'
import axios, { AxiosResponse, AxiosError } from "axios"
import { handleAxiosClientError } from '../lib/handleAxiosError'
import CoinmarketcapResponse from '../types/coinmarketcap'

const FETCHER_KEY = "/api/quotes"

const fetcher = async (url: string) => {
    return await axios
        .get(url)
        .then((res: AxiosResponse<CoinmarketcapResponse, AxiosError>) => res.data)
        .catch(handleAxiosClientError)
}

export default function useTSLatestQuotes() {
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
