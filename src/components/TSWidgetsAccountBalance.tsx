import dynamic from "next/dynamic";

import { useEvmNativeBalance, useEvmWalletNFTs } from "@moralisweb3/next";
import Box from "@mui/material/Box";
import MaterialButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { EvmAddressish, EvmChain } from "@moralisweb3/common-evm-utils";
import { useAccount } from "wagmi";
import configs from "../lib/config";
import { numberFormatter } from "../util/formatters";
import { useFiatPurchaseContext } from "./TSFiatPurchase/TSFiatPurchaseProvider";
import CoinbaseButton from "./CoinbaseButton";

const TSMoralisNFTCard = dynamic(() => import("./TSMoralisNFTCard"));

const { NFT_ACCESS_TOKEN_ADDRESS, NFT_ACCESS_TOKEN_CHAIN_NAME } = configs;

const NFT_ACCESS_TOKEN_CHAIN =
  NFT_ACCESS_TOKEN_CHAIN_NAME === "ETHEREUM"
    ? EvmChain.ETHEREUM
    : EvmChain.POLYGON;

const ENS_ACCESS_TOKEN_ADDRESS = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85";
const ENS_ACCESS_TOKEN_CHAIN = EvmChain.ETHEREUM;

const Button = styled(MaterialButton)(() => ({
  borderRadius: 75,
}));

const TSWidgetsAccountBalance = () => {
  const { address } = useAccount();
  const { togglePurchaseModal } = useFiatPurchaseContext();

  const { data: nftData } = useEvmWalletNFTs({
    address: address as EvmAddressish,
    chain: NFT_ACCESS_TOKEN_CHAIN.hex,
    tokenAddresses: [NFT_ACCESS_TOKEN_ADDRESS],
    limit: 1,
  });

  const { data: ensData } = useEvmWalletNFTs({
    address: address as EvmAddressish,
    chain: ENS_ACCESS_TOKEN_CHAIN.hex,
    tokenAddresses: [ENS_ACCESS_TOKEN_ADDRESS],
    limit: 1,
  });

  const { data: ethBalance } = useEvmNativeBalance({
    address: address as EvmAddressish,
    chain: EvmChain.ETHEREUM.hex,
  });

  const { data: maticBalance } = useEvmNativeBalance({
    address: address as EvmAddressish,
    chain: EvmChain.POLYGON.hex,
  });

  const floatMatic = parseFloat(maticBalance?.balance.ether || "0");
  const formattedMatic = numberFormatter.format(floatMatic);

  const floatEth = parseFloat(ethBalance?.balance.ether || "0");
  const formattedEth = numberFormatter.format(floatEth);

  const hasNFTs = !!(nftData?.length || ensData?.length);

  const buttonLabel = floatMatic > 0 || floatEth > 0 ? "BUY / SELL" : "BUY";

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto auto",
        gap: 2,
        mt: 2,
        minWidth: 235,
      }}
    >
      {hasNFTs && (
        <Typography variant="h6" sx={{ gridColumn: "span 2" }}>
          Your Tradeshare Pass
        </Typography>
      )}
      {!!nftData?.length && (
        <Box sx={{ gridColumn: "span 2" }}>
          <TSMoralisNFTCard nft={nftData[0]} />
        </Box>
      )}
      {!nftData?.length && !!ensData?.length && (
        <Box sx={{ gridColumn: "span 2" }}>
          <TSMoralisNFTCard nft={ensData[0]} />
        </Box>
      )}
      <Typography variant="h6">Token Balances</Typography>
      <Typography
        component="span"
        variant="body1"
        sx={{ gridColumn: "span 2" }}
      >
        {formattedMatic} MATIC
      </Typography>
      <Typography
        component="span"
        variant="body1"
        sx={{ gridColumn: "span 2" }}
      >
        {formattedEth} ETH
      </Typography>
      {address && (
        <CoinbaseButton
          sx={{
            alignSelf: "center",
            gridColumn: "span 2",
          }}
          destinationWalletAddress={address}
          buttonText={buttonLabel}
        />
      )}
      {/* <Button
        sx={{
          alignSelf: "center",
          gridColumn: "span 2",
        }}
        onClick={() => togglePurchaseModal()}
        variant="contained"
      >
        {buttonLabel}
      </Button> */}
    </Box>
  );
};

export default TSWidgetsAccountBalance;
