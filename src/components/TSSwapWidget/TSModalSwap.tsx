import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useAccount } from "wagmi";

import { darkTheme, SwapWidget, Theme as SwapTheme } from "@uniswap/widgets";

import tradeshareTheme from "../../lib/tradeshareTheme";
import ModalTransition from "../ModalTransition";

const PAGE_TITLE = "Quick Swap";
const PAGE_SUBTITLE = `
    Convert your existing assets to other desired assets without a middleman using the Polygon
    network and the Uniswap protocol. Soon we'll integrate with more networks like Ethereum, Solana, 
    and Avalanche to allow for more interoperabiliy between swaps.`;
const CONNECT_WALLET = "Please connect a wallet to enable swap functionality.";

const swapTheme: SwapTheme = {
  ...darkTheme,
  primary: tradeshareTheme.palette.primary.dark,
};

interface TSModalSwapProps {
  open: boolean;
  onClose: (_: boolean) => void;
}

export default function TSModalSwap({ open, onClose }: TSModalSwapProps) {
  const theme = useTheme();
  const { isConnected } = useAccount();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!isConnected) {
    return (
      <Dialog
        open={open}
        onClose={() => onClose(false)}
        fullScreen={fullScreen}
        TransitionComponent={ModalTransition}
        aria-describedby="dialog-swap-content"
        keepMounted
      >
        <Typography align="center" sx={{ my: 3 }}>
          {CONNECT_WALLET}
        </Typography>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      fullScreen={fullScreen}
      TransitionComponent={ModalTransition}
      aria-describedby="dialog-swap-content"
      keepMounted
    >
      {fullScreen ? (
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => onClose(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <DialogTitle sx={{ ml: 2, flex: 1 }}>{PAGE_TITLE}</DialogTitle>
          </Toolbar>
        </AppBar>
      ) : (
        <DialogTitle textAlign="center">{PAGE_TITLE}</DialogTitle>
      )}
      <DialogContent>
        <DialogContentText
          variant="subtitle1"
          align="center"
          color="secondary"
          id="dialog-swap-content"
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
          }}
        >
          {PAGE_SUBTITLE}
        </DialogContentText>
        <SwapWidget
          theme={swapTheme}
          width="100%"
          className="TSSwapWidget"
          hideConnectionUI={true}
        />
      </DialogContent>
    </Dialog>
  );
}
