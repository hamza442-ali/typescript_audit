import Link from "next/link";
import Box from "@mui/system/Box";
import StyledButton from "./TSStyledButton";

const BUTTON_MESSAGES = {
  signIn: "You are not signed in. Go to sign in to access your account.",
};

const SignInButton = () => {
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
      <Link href="/auth/signin" passHref>
        <StyledButton variant={"outlined"} size={"medium"}>
          {BUTTON_MESSAGES.signIn}
        </StyledButton>
      </Link>
    </Box>
  );
};

export default SignInButton;
