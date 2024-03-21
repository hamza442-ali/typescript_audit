import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

export const FiatPurchaseContext = createContext({
  isPurchaseModalOpen: false,
  togglePurchaseModal: (_: boolean = false) => {},
});

export const useFiatPurchaseContext = () => useContext(FiatPurchaseContext);

export default function FiatPurchaseProvider({ children }: PropsWithChildren) {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] =
    useState<boolean>(false);

  const togglePurchaseModal = useCallback(
    (open = false) => {
      setIsPurchaseModalOpen(open || !isPurchaseModalOpen);
    },
    [isPurchaseModalOpen]
  );

  return (
    <FiatPurchaseContext.Provider
      value={{ isPurchaseModalOpen, togglePurchaseModal }}
    >
      {children}
    </FiatPurchaseContext.Provider>
  );
};
