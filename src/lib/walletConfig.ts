import { configureChains, createConfig } from "wagmi";
import { polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import {
  connectorsForWallets,
  getDefaultWallets
} from "@rainbow-me/rainbowkit";

import {
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { tradeshareWallet } from "./tradeshareWallet"

import configs from "./config";

const { ALCHEMY_API_KEY, APP_NAME, WALLET_CONNECT_PROJECT_ID: projectId } = configs;

const { chains, publicClient } = configureChains(
  [polygon],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY }), publicProvider()]
);

const rainbowKitAppInfo = {
  appName: APP_NAME,
};

const { wallets } = getDefaultWallets({
  appName: APP_NAME,
  projectId,
  chains
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      // tradeshareWallet({ chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

// console.log("COnnrctors" , connectors)

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { chains, rainbowKitAppInfo }

export default wagmiConfig;
