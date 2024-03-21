import { MoralisDataObjectValue } from "@moralisweb3/common-core";
import { EvmNft } from "@moralisweb3/common-evm-utils";

export interface TSMoralisNFTCardProps {
  key?: string | number;
  nft: EvmNft;
}

export interface TSMoralisNFTAuthCardProps extends TSMoralisNFTCardProps {
  onClickAuth?: () => void;
}

export type TSMoralisNFTMetadata =
| (MoralisDataObjectValue & {
    name?: string;
    url?: string;
    image_url?: string;
    image?: string;
    background_image?: string;
    description?: string;
  })
| undefined;