"use client";

import Box from "@mui/material/Box";
import { useAccount } from "wagmi";

type AuthSigninLayoutProps = {
  children: React.ReactNode;
  signedIn: React.ReactNode;
  signedOut: React.ReactNode;
};

export default function Layout({
  children,
  signedIn,
  signedOut,
}: AuthSigninLayoutProps) {
  const { isConnected } = useAccount();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        textAlign: "center",
        padding: "1rem",
        minHeight: "90vh",
      }}
    >
      <>{children}</>
      {isConnected ? <>{signedIn}</> : <>{signedOut}</>}
    </Box>
  );
}
