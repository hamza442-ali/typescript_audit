import { ZapperResultV2BalancesApps, ZapperResultV2BalancesTokensPayload } from "../types/zapper";

type ZapperAppData = ZapperResultV2BalancesApps[] | undefined
type ZapperTokenData = ZapperResultV2BalancesTokensPayload | undefined

export function getZapperTokensBalanceUSD(
  zapperTokenData: ZapperTokenData
) {
  let totalBalance = 0.0;
  if (typeof zapperTokenData !== 'undefined') {
    for (const address in zapperTokenData) {
      totalBalance += zapperTokenData[address].reduce((acc, { token }) => {
        return acc + token.balanceUSD;
      }, totalBalance);
    }
  }
  return totalBalance;
}


export function getZapperAppsBalanceUSD(
  zapperData: ZapperAppData
) {
  let totalBalance = 0.0;
  if (Array.isArray(zapperData)) {
    totalBalance = zapperData.reduce((acc, { balanceUSD }) => {
      return acc + balanceUSD;
    }, totalBalance);
  }
  return totalBalance;
}
interface ZapperChartData {
  [index: string]: number
}

export function getZapperChartBalancesUSDByChain(
  zapperAppData: ZapperAppData,
  zapperTokenData: ZapperTokenData
) {
  let appDataset: ZapperChartData = {};
  if (Array.isArray(zapperAppData)) {
    const appBalances = zapperAppData.reduce((network, { appName, balanceUSD }) => {
      network[appName] = (network[appName] || 0) + balanceUSD;
      return network;
    }, appDataset)
    appDataset = Object.fromEntries(Object.entries(appBalances).filter(([k, v]) => v != 0).sort((a, b) => a[1] - b[1]))
  }

  let tokenDataset: ZapperChartData = {};
  if (typeof zapperTokenData !== 'undefined') {
    for (const address in zapperTokenData) {
      const tokenBalances = zapperTokenData[address].reduce((network, { token }) => {
        network[token.name] = (network[token.name] || 0) + token.balanceUSD;
        return network;
      }, tokenDataset)
      tokenDataset = Object.fromEntries(Object.entries(tokenBalances).filter(([k, v]) => v != 0).sort((a, b) => a[1] - b[1]))
    }
  }

  const dataset: ZapperChartData = { ...appDataset, ...tokenDataset };
  const labels: Array<string> = Object.keys(dataset);
  const series: Array<number> = Object.values(dataset);
  return { labels, series };
}
