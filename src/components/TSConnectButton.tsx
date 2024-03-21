import Avatar from "@mui/material/Avatar";
import ButtonGroup from "@mui/material/ButtonGroup";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { signOut } from "next-auth/react";
import { useDisconnect } from "wagmi";
import StyledButton from "./TSStyledButton";

const BUTTON_MESSAGES = {
  connectWallet: "Sign In or Connect Wallet",
  wrongNetwork: "Wrong Network",
};

interface TSConnectButtonProps {
  size?: "small" | "medium" | "large" | undefined;
}

// @See: https://www.rainbowkit.com/docs/custom-connect-button
// @See: https://github.com/rainbow-me/rainbowkit/blob/main/packages/rainbowkit/src/components/ConnectButton/ConnectButtonRenderer.tsx
const TSConnectButton = ({ size }: TSConnectButtonProps) => {
  const { disconnect } = useDisconnect({
    onSettled(data, error) {
      signOut({ redirect: true });
    },
  });

  const buttonSize = size ?? "small";

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <StyledButton
                    variant={"outlined"}
                    onClick={openConnectModal}
                    size={buttonSize}
                  >
                    {BUTTON_MESSAGES.connectWallet}
                  </StyledButton>
                );
              }
              if (chain.unsupported) {
                return (
                  <StyledButton
                    variant={"contained"}
                    color={"warning"}
                    size={buttonSize}
                    onClick={openChainModal}
                  >
                    {BUTTON_MESSAGES.wrongNetwork}
                  </StyledButton>
                );
              }
              return (
                <ButtonGroup variant={"contained"} size={buttonSize}>
                  <StyledButton onClick={() => disconnect()} size={buttonSize}>
                    {chain.hasIcon && chain.iconUrl && (
                      <Avatar
                        src={chain.iconUrl}
                        alt={chain.name ?? "Chain icon"}
                        sx={{ height: 20, width: 20, mr: 1 }}
                      />
                    )}
                    SIGN OUT
                  </StyledButton>
                </ButtonGroup>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default TSConnectButton;
