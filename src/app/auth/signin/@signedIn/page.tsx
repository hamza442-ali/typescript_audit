"use client";

import configs from "@/lib/config";
import { useEvmWalletNFTs } from "@moralisweb3/next";
import { EvmAddressish, EvmChain, EvmNft } from "@moralisweb3/common-evm-utils";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import SignedInHasNFT from "./SignedInHasNFT";
import SignedInNoNFT from "./SignedInNoNFT";

const { NFT_ACCESS_TOKEN_ADDRESS, NFT_ACCESS_TOKEN_CHAIN_NAME } = configs;

const NFT_ACCESS_TOKEN_CHAIN =
  NFT_ACCESS_TOKEN_CHAIN_NAME === "ETHEREUM"
    ? EvmChain.ETHEREUM
    : EvmChain.POLYGON;

const ENS_ACCESS_TOKEN_ADDRESS = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85";
const ENS_ACCESS_TOKEN_CHAIN = EvmChain.ETHEREUM;

export default function Page() {
  const { isConnected, address } = useAccount();
  const { fetch } = useEvmWalletNFTs();
  const [trdeNFTData, setTrdeNFTData] = useState<EvmNft[]>([]);
  const [ensData, setEnsData] = useState<EvmNft[]>([]);

  const [nftData, setNftData] = useState<EvmNft[]>([]);
  const [hasNFTs, setHasNFTs] = useState<boolean>(false);

  useEffect(() => {
    const fetchNFTs = async () => {
      const trdeNFTs = await fetch({
        address: address as EvmAddressish,
        chain: NFT_ACCESS_TOKEN_CHAIN.apiHex,
        tokenAddresses: [NFT_ACCESS_TOKEN_ADDRESS],
      });

      const ensNFTs = await fetch({
        address: address as EvmAddressish,
        chain: ENS_ACCESS_TOKEN_CHAIN.apiHex,
        tokenAddresses: [ENS_ACCESS_TOKEN_ADDRESS],
      });

      setTrdeNFTData(trdeNFTs?.data || []);
      setEnsData(ensNFTs?.data || []);
    };

    if (isConnected) {
      fetchNFTs();
    }
  }, [address, fetch, isConnected]);

  useEffect(() => {
    if (trdeNFTData?.length || ensData?.length) {
      setHasNFTs(true);
      setNftData((trdeNFTData || []).concat(ensData ?? []));
    } else {
      setHasNFTs(false);
    }
  }, [ensData, trdeNFTData]);

  return <>{hasNFTs ? <SignedInHasNFT nfts={nftData} /> : <SignedInNoNFT />}</>;
}
