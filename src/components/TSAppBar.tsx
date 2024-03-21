import AddCircleIcon from "@mui/icons-material/AddCircle";
import AttachMoney from "@mui/icons-material/AttachMoney";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppbar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";
import configs from "../lib/config";
import CoinbaseButton from "./CoinbaseButton";
import ConnectButton from "./TSConnectButton";
import { useFiatPurchaseContext } from "./TSFiatPurchase/TSFiatPurchaseProvider";
import StyledButton from "./TSStyledButton";
import tradeshareLogo from "/public/tradeshare-logo-white-full.png";
import tradeshareSignetLogo from "/public/tradeshare.png";

const DRAWER_WIDTH = configs.DRAWER_WIDTH;

const BUTTON_TEXT = {
  SWAP: "Swap",
  BUY_FIAT: "Buy Fiat",
  NEW_OFFER: "Request a Loan",
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  onClickButton?: () => void;
}

const AppBar = styled(MuiAppbar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function TSAppBar({ open, onClickButton }: AppBarProps) {
  const { status } = useSession();
  const { address } = useAccount();
  const isAuthenticated = status === "authenticated";
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { togglePurchaseModal } = useFiatPurchaseContext();
  // const { toggleSwapModal} = useSwapWidgetContext();

  // Mobile App Bar
  if (isMobileScreen) {
    // Mobile Signed In
    if (isAuthenticated) {
      return (
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onClickButton}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            {address && (
              <CoinbaseButton
                destinationWalletAddress={address}
                buttonText={""}
                buttonComponent={
                  <IconButton
                    // onClick={() => togglePurchaseModal()}
                    sx={{
                      position: "relative",
                      flexGrow: 1,
                      display: open ? "none" : "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <AttachMoney />
                  </IconButton>
                }
                sx={{ mr: 2, display: "inherit" }}
              />
            )}

            <Link href="/swap" passHref legacyBehavior>
              <IconButton
                // onClick={() => toggleSwapModal()}
                sx={{
                  position: "relative",
                  flexGrow: 1,
                  display: open ? "none" : "flex",
                  justifyContent: "flex-end",
                }}
              >
                <CurrencyExchangeIcon />
              </IconButton>
            </Link>
            <Link href="/borrow/offers/-1/new" passHref legacyBehavior>
              <IconButton
                sx={{
                  position: "relative",
                  flexGrow: 1,
                  display: open ? "none" : "flex",
                  justifyContent: "flex-end",
                }}
              >
                <AddCircleIcon />
              </IconButton>
            </Link>
            <Box
              sx={{
                position: "relative",
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Link href="/">
                <Image
                  src={tradeshareSignetLogo}
                  alt="Tradeshare Logo"
                  width={56}
                />
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      );
    }
    // Mobile Signed Out
    return (
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Box
            sx={{
              position: "relative",
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link href="/">
              <Image
                src={tradeshareSignetLogo}
                alt="Tradeshare Logo"
                width={56}
              />
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  // Desktop App Bar
  if (isAuthenticated) {
    // Signed In
    return (
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onClickButton}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              position: "relative",
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Link href="/">
              <Image
                src={tradeshareLogo}
                alt="Tradeshare Logo"
                width={200}
                priority={open ? true : false}
              />
            </Link>
          </Box>
          <Link href="/borrow/offers/-1/new" passHref legacyBehavior>
            <StyledButton
              sx={{ mr: 2, display: "inherit" }}
              startIcon={<AddCircleIcon />}
            >
              {BUTTON_TEXT.NEW_OFFER}
            </StyledButton>
          </Link>
          <Link href="/swap" passHref legacyBehavior>
            <StyledButton
              sx={{ mr: 2, display: "inherit" }}
              startIcon={<CurrencyExchangeIcon />}
            >
              {BUTTON_TEXT.SWAP}
            </StyledButton>
          </Link>
          {address && (
            <CoinbaseButton
              destinationWalletAddress={address}
              buttonText={BUTTON_TEXT.BUY_FIAT}
              buttonComponent={
                <StyledButton
                  sx={{ mr: 2, display: "inherit" }}
                  startIcon={<AttachMoney />}
                >
                  {BUTTON_TEXT.BUY_FIAT}
                </StyledButton>
              }
              sx={{ mr: 2, display: "inherit" }}
            />
          )}
          <Box sx={{ display: "inherit" }}>
            <ConnectButton />
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  // Signed Out
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <Box
          sx={{
            position: "relative",
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href="/">
            <Image
              src={tradeshareSignetLogo}
              alt="Tradeshare Logo"
              width={56}
            />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
