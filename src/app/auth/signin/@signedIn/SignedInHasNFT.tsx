"use client";

import ConnectButton from "@/components/TSConnectButton";
import Typography from "@mui/material/Typography";
import { EvmNft } from "@moralisweb3/common-evm-utils";
import NFTAuthCarousel from "../components/NFTAuthCarousel";

export default function SignedInHasNFT({ nfts }: { nfts: EvmNft[] }) {
  return (
    <>
      <Typography variant="h3">TRDEPASS NFT Acquired!</Typography>

      <NFTAuthCarousel nfts={nfts} />

      <ConnectButton size="large" />
    </>
  );
}
