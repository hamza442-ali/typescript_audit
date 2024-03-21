"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";

interface TSSessionPageLayoutProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function TitlePage({
  title,
  subtitle,
  children,
}: TSSessionPageLayoutProps) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/signin");
    },
  });

  if (status === "loading") {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Typography variant="h5" align="center" sx={{ mb: 1 }}>
            Loading...
          </Typography>
          <LinearProgress />
        </Grid>
      </Grid>
    );
  }

  return (
    <Container>
      <Typography variant="h1" align="center">
        {title}
        {subtitle && (
          <Tooltip title={subtitle} placement="right">
            <InfoOutlinedIcon
              sx={{ fontSize: 20, position: "relative", top: "-8px", ml: 1 }}
            />
          </Tooltip>
        )}
      </Typography>
      {/* {subtitle && (
        <Typography variant="subtitle1" align="center" color="secondary">
          {subtitle}
        </Typography>
      )} */}
      {children}
    </Container>
  );
}
