import { TSMoralisNFTMetadata } from "../types/moralis";

export function getMetadataImageSrc(metadata: TSMoralisNFTMetadata) {
  const image = metadata?.image || metadata?.image_url || "";
  const imageSrc = image.replace("ipfs://", "https://ipfs.io/ipfs/")
  if (imageSrc.startsWith("https://api.edns.domains")) {
    return ""
  }
  return imageSrc;
}
