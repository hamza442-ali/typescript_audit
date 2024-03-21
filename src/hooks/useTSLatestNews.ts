import useSWR from 'swr'
import axios, { AxiosResponse, AxiosError } from "axios"
import { handleAxiosClientError } from '../lib/handleAxiosError'
import CryptoPanicResponse from '../types/cryptopanic'

const FETCHER_KEY = "/api/news"

const fetcher = async (url: string) => {
    return await axios
        .get(url)
        .then((res: AxiosResponse<CryptoPanicResponse, AxiosError>) => res.data)
        .catch(handleAxiosClientError);
};

export default function useTSLatestNews() {
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
