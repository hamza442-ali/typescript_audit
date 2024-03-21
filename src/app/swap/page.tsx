import { Metadata } from "next";
import { pageInfo } from "../../lib/messages/pages";
import TitlePage from "../components/TSTitlePage";
import SwapPage from "./swap";

export const metadata: Metadata = {
  title: pageInfo.swap.title,
};

export default function Page() {
  return (
    <TitlePage title={pageInfo.swap.title} subtitle={pageInfo.swap.subtitle}>
      <SwapPage />
    </TitlePage>
  );
}
