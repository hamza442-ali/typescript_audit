import { useEvmWalletNFTs } from "@moralisweb3/next";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { EvmAddressish, EvmChain, EvmNft } from "@moralisweb3/common-evm-utils";
import Image from "next/image";
import { useAccount } from "wagmi";
import { TSMoralisNFTMetadata } from "../types/moralis";
import { getMetadataImageSrc } from "../util/nfts";
import { GridBox } from "./TSStyledDataGrid";
import { Suspense } from "react";

const ImageFit = styled(Image)(() => ({
  display: "block",
  objectFit: "cover",
  width: "100%",
  height: "100%",
  borderStartStartRadius: 25,
  borderStartEndRadius: 25,
  alignSelf: "center",
  justifySelf: "center",
}));

interface MoralisNFTListItemProps {
  nft: EvmNft;
}

const MoralisNFTListItem = ({ nft }: MoralisNFTListItemProps) => {
  const metadata: TSMoralisNFTMetadata = nft.toJSON().metadata;
  if (!metadata) return <></>;

  const cardImage = getMetadataImageSrc(metadata);

  if (cardImage === "") return <></>;

  return (
    <Suspense fallback={<></>}>
      <ImageListItem>
        <ImageFit
          src={cardImage}
          alt={metadata.name || ""}
          fill={true}
          loading="lazy"
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />
        <ImageListItemBar
          title={metadata.name}
          subtitle={metadata.description}
        />
      </ImageListItem>
    </Suspense>
  );
};

const MoralisNFTImageList = () => {
  const { address } = useAccount();
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: nftData } = useEvmWalletNFTs({
    chain: EvmChain.POLYGON.hex,
    address: address as EvmAddressish,
    normalizeMetadata: true,
  });
  const { data: ethData } = useEvmWalletNFTs({
    chain: EvmChain.ETHEREUM.hex,
    address: address as EvmAddressish,
    normalizeMetadata: true,
  });

  if (nftData?.length || ethData?.length) {
    return (
      <GridBox>
        <Box>
          <ImageList
            rowHeight={isFullScreen ? 230 : isMobileScreen ? 360 : 300}
            cols={isFullScreen ? 4 : isMobileScreen ? 1 : 2}
            gap={4}
          >
            {nftData &&
              nftData.map((nft) => {
                const key = `${nft.tokenAddress}_${nft.tokenHash}`;
                return <MoralisNFTListItem key={key} nft={nft} />;
              })}
            {ethData &&
              ethData.map((nft) => {
                const key = `${nft.tokenAddress}_${nft.tokenHash}`;
                return <MoralisNFTListItem key={key} nft={nft} />;
              })}
          </ImageList>
        </Box>
      </GridBox>
    );
  } else {
    return (
      <Typography sx={{ textAlign: "center" }} variant="subtitle1">
        No Digital Assets found.
      </Typography>
    );
  }
};

export default MoralisNFTImageList;
