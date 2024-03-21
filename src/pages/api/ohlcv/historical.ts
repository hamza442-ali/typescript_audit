import axios, { AxiosError, AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import handleAxiosError from '../../../lib/handleAxiosError'
import CoinmarketcapResponse from '../../../types/coinmarketcap'
import configs from '../../../lib/config'

const baseURL = configs.API_URL_COINMARKETCAP_TESTING;
const API_KEY = configs.API_KEY_COINMARKETCAP_TESTING;

const url = "/v2/cryptocurrency/ohlcv/historical"

const headers = {
    'X-CMC_PRO_API_KEY': API_KEY
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const params = req.query
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