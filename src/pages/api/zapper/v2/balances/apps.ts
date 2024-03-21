import axios, { AxiosError, AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { FetchBalanceParams, ZapperResultV2BalancesApps } from '../../../../../types/zapper'
import configs from '../../../../../lib/config'
import handleAxiosError from '../../../../../lib/handleAxiosError'

const baseURL = configs.API_URL_ZAPPER;
const API_KEY = configs.API_KEY_ZAPPER;

const url = "/v2/balances/apps"
const statusUrl = "/v2/balances/job-status"

const auth = {
  username: API_KEY,
  password: ""
}

const postAuth = `Basic ${Buffer.from(`${API_KEY}:`, "binary").toString(
  "base64"
)}`;


type FetchBalanceQuery = Partial<{ [key: string]: string | string[] }>
type FetchBalanceParamsOrQuery = FetchBalanceParams | FetchBalanceQuery

export async function fetchBalances(params: FetchBalanceParamsOrQuery) {
  // We need to first send a POST request to the Zapper API to make sure we are showing the latest balances

  //@ts-ignore
  const postAddress = params['addresses[]']
  const postUrl = `${url}?addresses%5B%5D=${postAddress}`
  const { data } = await axios.post(postUrl, undefined, { baseURL, headers: { accept: "*/*", Authorization: postAuth } })

  const jobId = data.jobId;
  const jobStatusUrl = `${statusUrl}?jobId=${jobId}`;
  let jobStatus;
  do {
    const jobStatusResponse = await axios.get(jobStatusUrl, { baseURL, auth }
    );
    jobStatus = jobStatusResponse.data.status;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } while (jobStatus !== "completed");

  const response: AxiosResponse<ZapperResultV2BalancesApps[], AxiosError> = await axios
    .get(url, { baseURL, params, auth })
  return response
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return await fetchBalances(req.query)
      .then(result => res.status(result.status).json((result.data)))
      .catch(handleAxiosError(res))
  } else {
    res.status(405).end()
  }
}