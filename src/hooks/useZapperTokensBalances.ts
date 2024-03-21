import axios, { AxiosError, AxiosResponse } from "axios"
import useSWR from 'swr'
import { handleAxiosClientError } from '../lib/handleAxiosError'
import { FetchBalanceParams, ZapperResultV2BalancesTokensPayload } from '../types/zapper'

const FETCHER_KEY = "/api/zapper/v2/balances/tokens"

interface ZapperFetchBalanceArgs {
    url: string
    params: FetchBalanceParams
}

const fetcher = async ({ url, params }: ZapperFetchBalanceArgs) => {
    return await axios
        .get(url, { params })
        .then((res: AxiosResponse<ZapperResultV2BalancesTokensPayload, AxiosError>) => res.data)
        .catch(handleAxiosClientError)
}

export default function useZapperTokensBalances(params: FetchBalanceParams | null) {
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
