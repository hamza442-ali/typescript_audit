type MetaType =
  | "wallet"
  | "supplied"
  | "borrowed"
  | "claimable"
  | "vesting"
  | "nft"
  | null;

type DisplayItem = {
  type: string;
  value: string | number;
};

export type TokenBreakdown = {
  key?: string;
  type: "token";
  appId: string | null;
  metaType: MetaType;
  address: string;
  balanceUSD: number;
  network: string;
  contractType: string;
  breakdown: Array<
    PositionBreakdown | NonFungibleTokenBreakdown | TokenBreakdown
  >;
  context: {
    balance: number;
    balanceRaw: string;
    symbol: string;
    price: number;
    decimals: number;
  };
  displayProps: {
    label: string;
    secondaryLabel: DisplayItem | null;
    tertiaryLabel: DisplayItem | null;
    images: string[];
    stats: Array<{ label: DisplayItem; value: DisplayItem }>;
    info: Array<{ label: DisplayItem; value: DisplayItem }>;
    balanceDisplayMode: string;
  };
};

type NonFungibleTokenBreakdown = {
  key?: string;
  type: "nft";
  appId: string | null;
  metaType: MetaType;
  address: string;
  balanceUSD: number;
  network: string;
  contractType: string;
  breakdown: Array<
    PositionBreakdown | NonFungibleTokenBreakdown | TokenBreakdown
  >;
  assets: Array<{
    assetImg: string;
    assetName: string;
    balance: number;
    balanceUSD: number;
    tokenId: string;
  }>;
  context: {
    amountHeld: number;
    floorPrice: number;
    holdersCount: number;
    incomplete: boolean;
    openseaId: string;
  };
  displayProps: {
    label: string;
    secondaryLabel: DisplayItem | null;
    tertiaryLabel: DisplayItem | null;
    profileBanner: string;
    profileImage: string;
    featuredImage: string;
    featuredImg: string;
    images: Array<string>;
    stats: Array<{ label: DisplayItem; value: DisplayItem }>;
    info: Array<{ label: DisplayItem; value: DisplayItem }>;
    collectionImages: Array<string>;
    balanceDisplayMode: string;
  };
};

type PositionBreakdown = {
  key?: string;
  type: "position";
  appId: string | null;
  metaType: MetaType;
  address: string;
  balanceUSD: number;
  network: string;
  contractType: string;
  breakdown: Array<
    PositionBreakdown | NonFungibleTokenBreakdown | TokenBreakdown
  >;
  displayProps: {
    label: string;
    secondaryLabel: DisplayItem | null;
    tertiaryLabel: DisplayItem | null;
    images: Array<string>;
    stats: Array<{ label: DisplayItem; value: DisplayItem }>;
    info: Array<{ label: DisplayItem; value: DisplayItem }>;
    balanceDisplayMode: string;
  };
};

type CategoryNames =
  | "claimable"
  | "debt"
  | "deposits"
  | "locked"
  | "nft"
  | "vesting"
  | "wallet";

type BalancePayload = {
  [category_name in CategoryNames]:
  | {
    [token_key: string]:
    | PositionBreakdown
    | NonFungibleTokenBreakdown
    | TokenBreakdown;
  }
  | {};
};

type PartialTotal = {
  key: string;
  type: "app-token" | "non-fungible-token";
  network: string;
  balanceUSD: number;
};

type TotalsPayload = PartialTotal[];

type AppPayload = {
  appId: string;
  network: string;
  data: Array<PositionBreakdown | NonFungibleTokenBreakdown | TokenBreakdown>;
  displayProps: {
    appName: string;
    images: Array<string>;
  };
  meta: {
    total: number;
  };
};

export type ErrorItem = {
  message: string;
  url: string;
};

type PresentedBalancePayload = {
  appId: "tokens" | "nft" | string;
  network: string;
  addresses: string[];
  balance: BalancePayload;
  totals: TotalsPayload;
  app?: AppPayload;
  errors?: ErrorItem[]
};

type ZapperAvailableNetworks = ("ethereum" | "polygon" | "optimism" | "gnosis" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum" | "celo" | "moonriver" | "bitcoin" | "cronos" | "aurora")

export interface FetchBalanceParams {
    addresses: Array<string>
    networks?: Array<ZapperAvailableNetworks>
    bundled?: boolean
}

export interface FetchNFTParams {
  addresses: Array<string>;
  collectionAddresses?: Array<string>;
  minCollectionValueUsd?: number;
  search?: string;
  network?: ZapperAvailableNetworks
  limit?: number;
  cursor?: string;
}

export interface FetchBalanceResult {
    status: number
    data: Array<PresentedBalancePayload>
}

export interface FetchNFTResult {
  status: number
  data: Array<NFTTokenBalance>
}

type NFTTokenMedia = {
  type: string;
  originalUrl: string;
}
type NFTTokenCollection = {
  address: string;
  network: string;
  name: string;
  nftStandard: "erc721" | "erc1155" | string;
  floorPriceEth: number | string;
  openseaId: string;
  logoImageUrl?: string;
  type?: string;
}

type NFTToken = {
  name: string;
  tokenId: string;
  lastSaleEth: number;
  rarityRank: number;
  estimatedValueEth: number;
  medias: Array<NFTTokenMedia>
  collection: NFTTokenCollection
}
export type NFTTokenBalance = {
  balance: number;
  token: NFTToken;
}

export type NFTTokenResult = {
  cursor: string,
  items: Array<NFTTokenBalance>
}

export type ZapperComponentParams = {
  zapperData: PresentedBalancePayload[] | undefined;
  zapperIsLoading: boolean;
  zapperError: any;
}

type ZapperResultV2BalancesAppsProductsAssetsTokens = {
  type: string;
  network: string;
  address: string;
  symbol: string;
  decimals: number;
  price: number;
  balance: number;
  balanceRaw: string;
  balanceUSD: number;
}

type ZapperResultV2BalancesAppsProductsAssetsDataProps = {
  liquidity: number;
  reserves: number[];
  apy: number;
  isDebt: boolean;
  liquidationThreshold: number;
  enabledAsCollateral: boolean;
  isActive: boolean;
}

type ZapperResultV2BalancesAppsProductsAssetsDisplayProps = {
  label: string;
  labelDetailed: string;
  secondaryLabel: {
      type: string;
      value: number;
  }
  tertiaryLabel: string;
  images: string[];
  statsItems: {
      label: string;
      value: {
          type: string;
          value: number;
      }
  }[];
}

type ZapperResultV2BalancesAppsProductsAssets = {
  tokens: ZapperResultV2BalancesAppsProductsAssetsTokens[];
  symbol: string;
  decimals: number;
  supply: number;
  pricePerShare: number[];
  price: number;
  dataProps: ZapperResultV2BalancesAppsProductsAssetsDataProps;
  displayProps: ZapperResultV2BalancesAppsProductsAssetsDisplayProps;
  balance: number;
  balanceRaw: number;
  balanceUSD: number;
}

type ZapperResultV2BalancesAppsProducts = {
  label: string;
  assets: ZapperResultV2BalancesAppsProductsAssets;
}

export type ZapperResultV2BalancesApps = {
  key: string;
  addresses?: string[];
  address?: string;
  appId: string;
  appName: string;
  appImage: string;
  network: string;
  updatedAt: string;
  balanceUSD: number;
  products: ZapperResultV2BalancesAppsProducts[];
  meta: string[];
}

export type ZapperResultV2BalancesTokensToken = {
  id: string;
  networkId: number;
  address: string;
  label?: string;
  name: string;
  symbol: string;
  decimals: number;
  coningeckoId?: string;
  status: string;
  hide: boolean;
  canExchange: boolean;
  verified: boolean;
  externallyVerified: boolean;
  priceUpdatedAt: string;
  updatedAt: string;
  createdAt: string;
  price: number;
  dailyVolume: number;
  totalSupply: number;
  holdersEnabled: boolean;
  marketCap: number;
  balance: number;
  balanceUSD: number;
  balanceRaw: string;
}

export type ZapperResultV2BalancesTokens = {
  key: string;
  address?: string;
  addresses?: string[];
  network: string;
  updatedAt: string;
  token: ZapperResultV2BalancesTokensToken;
}

export type ZapperResultV2BalancesTokensPayload = {
  [key: string]: ZapperResultV2BalancesTokens[]
}

export default PresentedBalancePayload