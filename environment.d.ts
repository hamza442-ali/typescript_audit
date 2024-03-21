import TradeshareApp from "./pages/_app";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            API_KEY_COINMARKETCAP_TESTING: string;
            API_KEY_COINMARKETCAP: string;
            API_KEY_CRYPTO_PANIC: string;
            API_KEY_ZAPPER: string;
            API_URL_COINMARKETCAP_TESTING: string;
            API_URL_COINMARKETCAP: string;
            API_URL_CRYPTO_PANIC: string;
            API_URL_ZAPPER: string;
            CI: boolean;
            MORALIS_API_KEY: string;
            MORALIS_AUTH_DOMAIN: string;
            NEXT_PUBLIC_ALCHEMY_API_KEY: string;
            NEXT_PUBLIC_NFT_ACCESS_TOKEN_ADDRESS: string;
            NEXT_PUBLIC_NFT_ACCESS_TOKEN_CHAIN_NAME: 'POLYGON' | 'ETHEREUM'
            NEXT_PUBLIC_NFT_PURCHASE_LINK: string;
            NEXT_PUBLIC_TRANSAK_API_KEY: string;
            NEXT_PUBLIC_TRANSAK_API_URL: string;
            NEXT_PUBLIC_WEB3AUTH_CLIENT_ID: string;
            NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string;
            NODE_ENV: 'development' | 'production' | 'test';
        }
    }
}

export { }