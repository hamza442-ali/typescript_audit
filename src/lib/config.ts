import env from "env-var";

const validateEnvString = (envName: string, publicEnv: string | undefined) => {
  const target = publicEnv;
  if (typeof target === 'undefined' || target === "") {
    throw new Error(
      `Public Env '${envName}: ${publicEnv}' is not defined. String is required.`
    );
  } else {
    return target;
  }
}

const CONSTANTS = {
  APP_NAME: 'Tradeshare MVP',
  DRAWER_WIDTH: 240,
}

const publicEnvs = {
  ALCHEMY_API_KEY: validateEnvString('ALCHEMY_API_KEY ', process.env.NEXT_PUBLIC_ALCHEMY_API_KEY),
  NFT_ACCESS_TOKEN_ADDRESS: validateEnvString('NFT_ACCESS_TOKEN_ADDRESS', process.env.NEXT_PUBLIC_NFT_ACCESS_TOKEN_ADDRESS),
  NFT_ACCESS_TOKEN_CHAIN_NAME: validateEnvString('NFT_ACCESS_TOKEN_CHAIN_NAME', process.env.NEXT_PUBLIC_NFT_ACCESS_TOKEN_CHAIN_NAME),
  NFT_PURCHASE_LINK: validateEnvString('NEXT_PUBLIC_NFT_PURCHASE_LINK', process.env.NEXT_PUBLIC_NFT_PURCHASE_LINK),
  TRANSAK_API_KEY: validateEnvString('TRANSAK_API_KEY', process.env.NEXT_PUBLIC_TRANSAK_API_KEY),
  TRANSAK_API_URL: validateEnvString('TRANSAK_API_URL', process.env.NEXT_PUBLIC_TRANSAK_API_URL),
  WEB3AUTH_CLIENT_ID: validateEnvString('NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,', process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID),
  WALLET_CONNECT_PROJECT_ID: validateEnvString('NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID', process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID),
  SUPABASE_URL: validateEnvString('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL),
  SUPABASE_ANON_KEY: validateEnvString('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  APP_ID_COINBASE_PAY: validateEnvString('NEXT_PUBLIC_APP_ID_COINBASE_PAY', process.env.NEXT_PUBLIC_APP_ID_COINBASE_PAY),
}

const platformConfigs = {
  CI: process.env.CI || false,
  NODE_ENV: process.env.NODE_ENV || 'development'
}

let serverConfigs = {
  API_KEY_COINMARKETCAP_TESTING: "",
  API_KEY_COINMARKETCAP: "",
  API_KEY_CRYPTO_PANIC: "",
  API_KEY_ZAPPER: "",
  API_URL_COINMARKETCAP_TESTING: "",
  API_URL_COINMARKETCAP: "",
  API_URL_CRYPTO_PANIC: "",
  API_URL_ZAPPER: "",
  MORALIS_API_KEY: "",
  MORALIS_AUTH_DOMAIN: "",
  SUPABASE_JWT_SECRET: "",
  SUPABASE_SERVICE_ROLE_KEY: "",
};

if (typeof window === 'undefined') {
  serverConfigs = {
    API_KEY_COINMARKETCAP_TESTING: env.get('API_KEY_COINMARKETCAP_TESTING').required().asString(),
    API_KEY_COINMARKETCAP: env.get('API_KEY_COINMARKETCAP').required().asString(),
    API_KEY_CRYPTO_PANIC: env.get('API_KEY_CRYPTO_PANIC').required().asString(),
    API_KEY_ZAPPER: env.get('API_KEY_ZAPPER').required().asString(),
    API_URL_COINMARKETCAP_TESTING: env.get('API_URL_COINMARKETCAP_TESTING').required().asUrlString(),
    API_URL_COINMARKETCAP: env.get('API_URL_COINMARKETCAP').required().asUrlString(),
    API_URL_CRYPTO_PANIC: env.get('API_URL_CRYPTO_PANIC').required().asUrlString(),
    API_URL_ZAPPER: env.get('API_URL_ZAPPER').required().asUrlString(),
    MORALIS_API_KEY: env.get('MORALIS_API_KEY').required().asString(),
    MORALIS_AUTH_DOMAIN: env.get('MORALIS_AUTH_DOMAIN').required().asString(),
    SUPABASE_JWT_SECRET: env.get('SUPABASE_JWT_SECRET').required().asString(),
    SUPABASE_SERVICE_ROLE_KEY: env.get('SUPABASE_SERVICE_ROLE_KEY').required().asString(),
  }
}

const configs = { ...CONSTANTS, ...publicEnvs, ...platformConfigs, ...serverConfigs }

export default configs;
