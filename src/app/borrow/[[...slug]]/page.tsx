import { pageInfo } from "@/lib/messages/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: pageInfo.borrow.title,
};

export default function Page() {
  return <></>;
}
