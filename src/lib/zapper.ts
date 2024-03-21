import { FetchBalanceParams } from "../types/zapper";

export const zapperParams: FetchBalanceParams = {
  addresses: [],
  networks: [
    "polygon",
    "ethereum",
    "optimism",
    "avalanche",
    "bitcoin",
    "binance-smart-chain",
  ],
  bundled: true,
};