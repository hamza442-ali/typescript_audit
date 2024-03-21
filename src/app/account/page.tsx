import { Metadata } from "next";
import { pageInfo } from "../../lib/messages/pages";
import TitlePage from "../components/TSTitlePage";
import AccountPageComponent from "./account";

export const metadata: Metadata = {
  title: pageInfo.account.title,
};

export default function Page() {
  return (
    <TitlePage
      title={pageInfo.account.title}
      subtitle={pageInfo.account.subtitle}
    >
      <AccountPageComponent />
    </TitlePage>
  );
}
