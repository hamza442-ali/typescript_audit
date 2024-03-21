import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AttachMoney from "@mui/icons-material/AttachMoney";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Divider from "@mui/material/Divider";
import MuiDrawer, { DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CSSObject, Theme, styled, useTheme } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import configs from "../lib/config";
import appNavigation from "../lib/navigationOptions";
import ConnectButton from "./TSConnectButton";
import { useFiatPurchaseContext } from "./TSFiatPurchase/TSFiatPurchaseProvider";
// import { useSwapWidgetContext } from "./TSSwapWidget/TSSwapWidgetProvider";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface SideBarProps extends MuiDrawerProps {
  open?: boolean;
  onClickButton?: () => void;
}

const { DRAWER_WIDTH } = configs;

const SWAP_HREF = "/swap";
const MAKE_BORROW_OFFER_HREF = "/borrow/offers/-1/new";

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // neccessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const NavList = ({ open }: SideBarProps) => {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { togglePurchaseModal } = useFiatPurchaseContext();
  // const { toggleSwapModal} = useSwapWidgetContext();
  return (
    <List>
      {appNavigation.map(({ key, title, icon, href, fontawesomeIcon }) => {
        const Icon = icon || undefined;
        return (
          <ListItem
            key={key}
            disablePadding
            sx={{
              display: "block",
              color:
                pathname === href
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
              borderRightStyle: pathname === href ? "solid" : "none",
            }}
          >
            <ListItemButton
              onClick={href ? () => router.push(href) : undefined}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1,
                  justifyContent: "center",
                }}
              >
                {fontawesomeIcon ? (
                  <FontAwesomeIcon icon={fontawesomeIcon} />
                ) : (
                  <Icon
                    sx={{
                      color:
                        pathname === href
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                    }}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primary={title}
                sx={{ opacity: { xs: 1, md: open ? 1 : 0 } }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
      <ListItem disablePadding sx={{ display: { xs: "block", md: "none" } }}>
        <ListItemButton
          onClick={() => router.push(MAKE_BORROW_OFFER_HREF)}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Make Offer"
            sx={{ opacity: { xs: 1, md: open ? 1 : 0 } }}
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ display: { xs: "block", md: "none" } }}>
        <ListItemButton
          onClick={() => router.push(SWAP_HREF)}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <CurrencyExchangeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Swap"
            sx={{ opacity: { xs: 1, md: open ? 1 : 0 } }}
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ display: { xs: "block", md: "none" } }}>
        <ListItemButton
          onClick={() => togglePurchaseModal()}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <AttachMoney />
          </ListItemIcon>
          <ListItemText
            primary="Buy Fiat"
            sx={{ opacity: { xs: 1, md: open ? 1 : 0 } }}
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ display: { xs: "block", md: "none" } }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ConnectButton />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

const MobileDrawer = ({ open, onClickButton }: SideBarProps) => {
  const theme = useTheme();
  return (
    <MuiDrawer
      variant="temporary"
      open={open}
      onClose={onClickButton}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: "block", md: "none" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={onClickButton}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <NavList open={open} />
    </MuiDrawer>
  );
};

const PermanentDrawer = ({ open, onClickButton }: SideBarProps) => {
  const theme = useTheme();
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{ display: { xs: "none", md: "block" } }}
    >
      <DrawerHeader>
        <IconButton onClick={onClickButton}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <NavList open={open} />
    </Drawer>
  );
};

export default function TSSideBar(props: SideBarProps) {
  const { status } = useSession();

  if (status !== "authenticated") return <></>;

  return (
    <>
      <MobileDrawer {...props} />
      <PermanentDrawer {...props} />
    </>
  );
}
