import CloseIcon from "@mui/icons-material/Close";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

import { useState } from "react";

interface TSAlertLoadingErrorProps {
  title?: string;
  message: string;
}

export default function TSAlertLoadingError({
  title,
  message,
}: TSAlertLoadingErrorProps) {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ width: "100% " }}>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ marginY: 2 }}
        >
          {title && <AlertTitle>{title}</AlertTitle>}
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}
