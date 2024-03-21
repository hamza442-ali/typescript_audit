import { Metadata } from "next";
import { pageInfo } from "@/lib/messages/pages";

export const metadata: Metadata = {
  title: pageInfo.portfolio.title,
};

export default function Page() {
  return <></>;
}
