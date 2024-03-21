# Tradeshare MVP Testbed

To view the current main branch build, go to [https://mvp-staging.tradeshare.com](https://mvp-staging.tradeshare.com)

## Installation

`npm install`

## Running things

- Unit tests (Jest): `npm run test`
- End-to-end tests (Playwright): `npm run test:e2e`
- Run Dev Server (NextJS): `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser view the app in dev mode.

## API Dependencies

- Alchemy (Blockchain Node Provider): <https://dashboard.alchemy.com>
- Coinmarketcap API (Market Feed): <https://pro.coinmarketcap.com/account>
- Cryptocompare API (Chart Data): <https://min-api.cryptocompare.com>
- Web3Auth (Social Login Provider): <https://dashboard.web3auth.io>
- CryptoPanic API (News): <https://cryptopanic.com/developers/api/>
- Transak Onramp Widget: <https://docs.transak.com/docs>
- Uniswap Widget: <https://github.com/Uniswap/widgets>
- Zapper FI API: <https://studio.zapper.fi/docs/apis/getting-started>

## Platform Dependencies

- Vercel (Hosting for MVP - Update envs and secrets here)
- Web3Auth (Be sure to whitelist URL changes in the Web3Auth Dashboard)

### Original Project Note

This will be the Main Repo for the TRADESHARE MVP. If we need to add additional Repos, we will use the name "TRADESHARE_MVP_2", and then "..._3" and so on.
