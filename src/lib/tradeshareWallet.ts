import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
import { Chain } from "@rainbow-me/rainbowkit";

import tradeshareLogoPngData from "./tradeshareLogoPngData";
import configs from "./config";

const { WEB3AUTH_CLIENT_ID, APP_NAME } = configs;

interface TradeshareWalletOptions {
  projectId?: string
  chains: Chain[]
}

export const tradeshareWallet = ({ chains }: TradeshareWalletOptions) => {
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x" + chains[0].id.toString(16),
    rpcTarget: chains[0].rpcUrls.default.http[0],
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorer: chains[0].blockExplorers?.default.url || ""
  }
  const web3AuthInstance = new Web3Auth({
    clientId: WEB3AUTH_CLIENT_ID,
    chainConfig,
    web3AuthNetwork: "cyan",
    uiConfig: {
      mode: "dark",
      loginMethodsOrder: ["google", "facebook", "twitter", "github", "discord", "twitch", "reddit", "apple", "linkedin", "line", "wechat", "email"],
      defaultLanguage: "en",
      logoDark: tradeshareLogoPngData,
      modalZIndex: "2147483647"
    },
  });
  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });
  const openLoginAdapterInstance = new OpenloginAdapter({
    privateKeyProvider,
    adapterSettings: {
      network: "cyan",
      uxMode: "popup",
      whiteLabel: {
        appName: APP_NAME,
        logoDark: tradeshareLogoPngData,
        defaultLanguage: "en",
        mode: "dark",
      }
    },
  });
  web3AuthInstance.configureAdapter(openLoginAdapterInstance);

  const torusPlugin = new TorusWalletConnectorPlugin({
    torusWalletOpts: {
      buttonPosition: "bottom-left",
    },
    walletInitOptions: {
      whiteLabel: {
        theme: { isDark: true, colors: { primary: "#00B4F3" } },
        logoDark: tradeshareLogoPngData,
        logoLight: tradeshareLogoPngData,
      },
      useWalletConnect: true,
      enableLogging: true,
    },
  });
  web3AuthInstance.addPlugin(torusPlugin);
  return {
    id: "tradeshare",
    name: "Tradeshare Wallet",
    iconUrl: tradeshareLogoPngData,
    iconBackground: "#09202a",
    createConnector: () => {
      const connector = new Web3AuthConnector({
        chains,
        options: {
          web3AuthInstance,
        },
      });
      return { connector };
    },
  };
};
