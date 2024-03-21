import axios, { AxiosError, AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import configs from '../../../../../../lib/config'
import handleAxiosError from '../../../../../../lib/handleAxiosError'
import { FetchNFTResult } from '../../../../../../types/zapper'

const baseURL = configs.API_URL_ZAPPER;
const API_KEY = configs.API_KEY_ZAPPER;

const url = "/v2/nft/balances/tokens"

const auth = {
    username: API_KEY,
    password: ""
}

type FetchBalanceQuery = Partial<{ [key: string]: string | string[] }>
export async function getZapperNFTResponse(params: FetchBalanceQuery) {
    const response: AxiosResponse<FetchNFTResult, AxiosError> = await axios
        .get(url, { baseURL, params, auth })
    return response
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return await getZapperNFTResponse(req.query)
            .then(result => res.status(result.status).json(result.data))
            .catch(handleAxiosError(res))
    } else {
        res.status(405).end()
    }
}