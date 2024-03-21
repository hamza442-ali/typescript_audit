import axios, { AxiosError, AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import configs from '../../lib/config'
import handleAxiosError from '../../lib/handleAxiosError'
import CoinmarketcapResponse from '../../types/coinmarketcap'

const baseURL = configs.API_URL_COINMARKETCAP;
const API_KEY = configs.API_KEY_COINMARKETCAP;

const url = "/v2/cryptocurrency/quotes/latest"

const params = {
    symbol: "BTC,ETH,MATIC,USDC"
}

const headers = {
    'X-CMC_PRO_API_KEY': API_KEY
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return await axios
            .get(url, { baseURL, params, headers })
            .then((result: AxiosResponse<CoinmarketcapResponse, AxiosError>) => {
                res.status(result.status).json(result.data)
            })
            .catch(handleAxiosError(res))
    } else {
        res.status(405).end()
    }
}