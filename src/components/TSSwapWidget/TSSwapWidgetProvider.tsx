import {
  createContext,
  PropsWithChildren,
  use,
  useCallback,
  useContext,
  useState,
} from "react";

import { useRouter } from "next/navigation";

export const SwapWidgetContext = createContext({
  isSwapModalOpen: false,
  toggleSwapModal: (_: boolean = false) => {},
});

export const useSwapWidgetContext = () => useContext(SwapWidgetContext);

export default function SwapWidgetProvider({ children }: PropsWithChildren) {
  const [isSwapModalOpen, setIsSwapModalOpen] = useState<boolean>(false);

  // const toggleSwapModal = useCallback(
  //   (open = false) => {
  //     setIsSwapModalOpen(open || !isSwapModalOpen);
  //   },
  //   [isSwapModalOpen]
  // );

  const useSwap = () => {
    const { push } = useRouter();
    push("/swap");
  };

  return (
    <SwapWidgetContext.Provider
      value={{ isSwapModalOpen, toggleSwapModal: useSwap }}
    >
      {children}
    </SwapWidgetContext.Provider>
  );
}
