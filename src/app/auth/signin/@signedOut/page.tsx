"use client";

import ConnectButton from "@/components/TSConnectButton";
import Typography from "@mui/material/Typography";
// import OpenSeaButton from "../components/OpenSeaButton";
import configs from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import tradeshareLogo from "/public/tradeshare-logo-white-full.png";
import trdepassImage from "/public/trdepass-image.png";

const { NFT_PURCHASE_LINK } = configs;

function SignedOutContent() {
  return (
    <>
      <Image
        src={tradeshareLogo}
        alt="Tradeshare Logo"
        width={250}
        priority={true}
      />
      <Typography variant="h4">Trade Today. Share Tomorrow.</Typography>

      <Typography variant="body1" sx={{ maxWidth: '360px'}}>
        The Tradeshare dApp aims to financial freedom and autonomy through its
        easy to use DeFi Wallet & Web 3 Browser! You can rest easy, knowing your
        crypto, NFTs and assets are secured with your own private keys! Be your
        own bank!
      </Typography>

      <Link
        href={NFT_PURCHASE_LINK}
        target="_blank"
        rel="noopener noreferrer"
        color="primary"
        style={{ textDecoration: "none" }}
      >
        <Image
          src={trdepassImage}
          alt="Trdepass Image"
          width={300}
          priority={true}
        />
        <Typography variant="body2" sx={{ color: "white" }}>
          Purchase a TRDEPASS
        </Typography>
      </Link>

      <ConnectButton size="large" />
    </>
  );
}

export default function Page() {
  return <SignedOutContent />;
}
