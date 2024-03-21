import axios, { AxiosError, AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import configs from "../../lib/config";
import handleAxiosError from "../../lib/handleAxiosError";
import CryptoPanicResponse from "../../types/cryptopanic";

const FETCHER_KEY = configs.API_URL_CRYPTO_PANIC;
const API_KEY = configs.API_KEY_CRYPTO_PANIC;

const params = {
    auth_token: API_KEY,
    public: true,
    filter: "rising",
    regions: "en",
    kind: "news",
    currencies: "ETH,BTC,MATIC",
};

export async function getNewsResponse() {
    const response: AxiosResponse<CryptoPanicResponse, AxiosError> = await axios
        .get(FETCHER_KEY, { params })
    return response
}

const latestNews = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        return await getNewsResponse()
            .then(result => res.status(result.status).json(result.data))
            .catch(handleAxiosError(res))
    } else {
        res.status(405).end()
    }
}

export default latestNews;