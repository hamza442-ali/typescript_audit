"use client";

import ModalTransition from "@/components/ModalTransition";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/navigation";

type ModalSlotProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function ModalSlot({
  title,
  subtitle,
  children,
}: ModalSlotProps) {
  const router = useRouter();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const onClose = () => {
    router.back();
  };

  const ariaDescribedBy = `dialog-${title
    .toLocaleLowerCase()
    .replace(" ", "-")}`;

  return (
    <Dialog
      open={true}
      onClose={() => onClose()}
      fullScreen={fullScreen}
      TransitionComponent={ModalTransition}
      aria-describedby={ariaDescribedBy}
      keepMounted
    >
      {fullScreen ? (
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => onClose()}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <DialogTitle sx={{ ml: 2, flex: 1 }}>{title}</DialogTitle>
          </Toolbar>
        </AppBar>
      ) : (
        <DialogTitle textAlign="center">{title}</DialogTitle>
      )}
      <DialogContent>
        {subtitle && (
          <DialogContentText
            variant="subtitle1"
            align="center"
            color="secondary"
            id={ariaDescribedBy}
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
            }}
          >
            {subtitle}
          </DialogContentText>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}
