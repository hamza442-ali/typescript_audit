import axios, { AxiosError, AxiosResponse } from "axios"
import useSWR from 'swr'
import { handleAxiosClientError } from '../lib/handleAxiosError'
import { FetchNFTParams, NFTTokenBalance, NFTTokenResult } from '../types/zapper'

const FETCHER_KEY = "/api/zapper/v2/nft/balances/tokens"

interface ZapperFetchBalanceArgs {
    url: string
    params: FetchNFTParams
}

const fetcher = async ({ url, params }: ZapperFetchBalanceArgs) => {
    return await axios
        .get(url, { params })
        .then((res: AxiosResponse<NFTTokenResult, AxiosError>) => res.data)
        .catch(handleAxiosClientError)
}

export default function useZapperNFTInfo(params: FetchNFTParams | null) {
    const { data, isLoading, error } = useSWR(params ?
        { url: FETCHER_KEY, params } : null,
        fetcher
    );
    return {
        data,
        isLoading,
        error
    }
}
