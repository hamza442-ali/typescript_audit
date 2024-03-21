import { MoralisNextApi } from "@moralisweb3/next";
import configs from "../../../lib/config";

const apiKey = configs.MORALIS_API_KEY;
const uri = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || "";
const domain = configs.MORALIS_AUTH_DOMAIN;

export default MoralisNextApi({
  apiKey,
  authentication: {
    domain,
    uri,
    timeout: 120,
  }
})