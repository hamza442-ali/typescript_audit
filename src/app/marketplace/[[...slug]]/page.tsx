import { Metadata } from "next";
import { pageInfo } from "@/lib/messages/pages";

export const metadata: Metadata = {
  title: pageInfo.marketplace.title,
};

export default function Page() {
  return <></>;
}