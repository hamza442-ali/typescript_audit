"use client";

import ModalSlot from "@/app/components/ModalSlot";

const TITLE = "Bid Form";
const SUBTITLE = "This is a placeholder page for the Bid Form.";

function SlotContent() {
  return (
    <>
      <p>COMING SOON: BID ON DEFAULTED LOANS</p>;
    </>
  );
}

export default function Page() {
  return (
    <ModalSlot title={TITLE} subtitle={SUBTITLE}>
      <SlotContent />
    </ModalSlot>
  );
}
