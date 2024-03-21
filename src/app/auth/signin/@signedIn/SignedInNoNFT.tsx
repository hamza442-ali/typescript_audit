"use client";

import ConnectButton from "@/components/TSConnectButton";
import Typography from "@mui/material/Typography";
import OpenSeaButton from "../components/OpenSeaButton";

export default function SignedInNoNFT() {
  return (
    <>
      <Typography variant="h3">TRDEPASS NFT Required</Typography>

      <Typography>
        There are no eligible NFTs in your Wallet. Please purchase a TRDEPASS
        using the link below, or contact Tradeshare.
      </Typography>

      <ConnectButton size="large" />

      <OpenSeaButton />
    </>
  );
}
