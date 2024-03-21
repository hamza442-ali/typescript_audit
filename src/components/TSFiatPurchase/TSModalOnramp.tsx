import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import queryString from "query-string";
import { useAccount } from "wagmi";
import configs from "../../lib/config";
import ModalTransition from "../ModalTransition";

const CONNECT_WALLET =
  "Please connect a wallet to enable purchase functionality.";
const PAGE_TITLE = "BUY / SELL CURRENCY";
const PAGE_SUBTITLE = `
    Buy or sell fiat currency via the Transak protocol on the Polygon network.`;

const FIAT_WIDGET_TITLE = "Transak On/Off Ramp Widget";

const { TRANSAK_API_URL, TRANSAK_API_KEY } = configs;

interface TSModalOnrampProps {
  open: boolean;
  onClose: (_: boolean) => void;
}

const WidgetFrame = styled("iframe")(() => ({
  display: "block",
  width: "100%",
  maxHeight: "625px",
  maxWidth: "500px",
}));

function TSOnrampWidget() {
  const { address } = useAccount();
  const theme = useTheme();

  if (!address)
    return (
      <Typography align="center" sx={{ my: 3 }}>
        {CONNECT_WALLET}
      </Typography>
    );

  const params = queryString.stringify({
    apiKey: TRANSAK_API_KEY,
    environment: "STAGING",
    cryptoCurrencyCode: "MATIC",
    defaultCryptoCurrency: "MATIC",
    defaultNetwork: "polygon",
    defaultPaymentMethod: "credit_debit_card",
    network: "polygon",
    fiatCurrency: "USD",
    themeColor: theme.palette.primary.main,
    walletAddress: address,
  });

  const widgetSrcUrl = `${TRANSAK_API_URL}?${params}`;

  return (
    <WidgetFrame height="625" title={FIAT_WIDGET_TITLE} src={widgetSrcUrl} />
  );
}

export default function TSModalOnramp({ open, onClose }: TSModalOnrampProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      fullScreen={fullScreen}
      TransitionComponent={ModalTransition}
      aria-describedby="dialog-onramp-content"
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
          id="dialog-onramp-content"
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
          }}
        >
          {PAGE_SUBTITLE}
        </DialogContentText>
        {/* <TSOnrampWidget /> */}
      </DialogContent>
    </Dialog>
  );
}
