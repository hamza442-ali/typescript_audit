"use client";

import configs from "@/lib/config";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { EvmAddressish, EvmChain, EvmNft } from "@moralisweb3/common-evm-utils";
import { SignInResponse, signIn, signOut } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";

const Carousel = dynamic(() => import("react-material-ui-carousel"));
const TSMoralisNFTCard = dynamic(() => import("@/components/TSMoralisNFTCard"));

const { NFT_ACCESS_TOKEN_CHAIN_NAME } = configs;

const NFT_ACCESS_TOKEN_CHAIN =
  NFT_ACCESS_TOKEN_CHAIN_NAME === "ETHEREUM"
    ? EvmChain.ETHEREUM
    : EvmChain.POLYGON;

export default function NFTAuthCarousel({ nfts }: { nfts: EvmNft[] }) {
  const router = useRouter();
  const { address } = useAccount();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect({
    onSettled: async () => {
      const data = await signOut({ redirect: false, callbackUrl: "/" });
      router.push(data.url);
    },
  });

  const handleNFTAuth = async () => {
    try {
      const challenge = await requestChallengeAsync({
        address: address as EvmAddressish,
        chainId: NFT_ACCESS_TOKEN_CHAIN.apiHex,
      });

      if (challenge && challenge.message) {
        const signature = await signMessageAsync({
          message: challenge.message,
        });

        const { error, url } = (await signIn("moralis-auth", {
          message: challenge.message,
          signature,
          redirect: false,
          callbackUrl: "/",
        })) as SignInResponse;

        if (error) {
          console.error("Signin Challenge Error: ", error);
          disconnect();
        } else {
          router.push(url ?? "/");
        }
      } else {
        console.error("Signin Challenge Error: ", challenge);
        disconnect();
      }
    } catch (e) {
      console.error("Signin Challenge Error: ", e);
      disconnect();
    }
  };

  return (
    <Box sx={{ minWidth: { xs: 335, md: 320 } }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body1" color="primary">
          You&apos;re ready to TRDE!
        </Typography>
        <Typography variant="body1" color="primary">
          Eligible Passes: {nfts.length}
        </Typography>
      </Box>
      <Carousel>
        {nfts.map((nft, idx) => (
          <TSMoralisNFTCard key={idx} nft={nft} onClickAuth={handleNFTAuth} />
        ))}
      </Carousel>
    </Box>
  );
}
