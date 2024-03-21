import configs from "@/lib/config";
import MarketNews from "./marketNews";

const { API_URL_CRYPTO_PANIC, API_KEY_CRYPTO_PANIC } = configs;

const params = {
  auth_token: API_KEY_CRYPTO_PANIC,
  public: "true",
  filter: "rising",
  regions: "en",
  kind: "news",
  currencies: "ETH,BTC,MATIC",
};

async function getData() {
  const res = await fetch(
    API_URL_CRYPTO_PANIC + "?" + new URLSearchParams(params)
  );

  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <MarketNews data={data} show_max={6} />;
}
