"use client";

import StyledButton from "@/components/TSStyledButton";
import configs from "@/lib/config";
import { initOnRamp } from "@coinbase/cbpay-js";
import { cloneElement, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { generateOnRampURL } from "@coinbase/cbpay-js";

const { APP_ID_COINBASE_PAY } = configs;

type InitOnRampOptions = Parameters<typeof initOnRamp>[0];

type CoinbaseButtonProps = {
  destinationWalletAddress: `0x${string}`;
  buttonText: string;
  buttonComponent?: React.ReactNode;
  sx?: any;
};

function CoinbaseButton({
  destinationWalletAddress,
  buttonText,
  buttonComponent,
  sx,
}: CoinbaseButtonProps) {
  // const [isReady, setIsReady] = useState(false);
  // const onRampInstance = useRef<CBPayInstanceType>();

  const onRampURL = generateOnRampURL({
    appId: APP_ID_COINBASE_PAY,
    destinationWallets: [
      { address: destinationWalletAddress, blockchains: ["polygon"] },
    ],
  });

  // useEffect(() => {
  //   const options: InitOnRampOptions = {
  //     appId: APP_ID_COINBASE_PAY,
  //     target: buttonComponent
  //       ? "#trde-coinbase-container-from-prop"
  //       : "#trde-coinbase-container",
  //     widgetParameters: {
  //       destinationWallets: [
  //         {
  //           address: destinationWalletAddress,
  //           blockchains: ["polygon"],
  //         },
  //       ],
  //     },
  //     onSuccess: () => {},
  //     onExit: () => {},
  //     onEvent: () => {},
  //     experienceLoggedIn: "embedded",
  //     experienceLoggedOut: "popup",
  //   };

  //   if (onRampInstance.current) {
  //     onRampInstance.current.destroy();
  //   }

  //   initOnRamp(options, (_error, instance) => {
  //     if (instance) {
  //       onRampInstance.current = instance;
  //       setIsReady(true);
  //     }
  //   });
  // }, [destinationWalletAddress, buttonComponent]);

  const handleOnPress = (event: React.MouseEvent<HTMLButtonElement>) => {
    // event.preventDefault();
    console.log("onRampURL", onRampURL);
    // onRampInstance.current?.open();
  };

  if (buttonComponent) {
    return cloneElement(buttonComponent as React.ReactElement, {
      id: "trde-coinbase-container-from-prop",
      onClick: handleOnPress,
      href: onRampURL,
      // disabled: !isReady,
    });
  }

  return (
    <div id="trde-coinbase-container">
      <Link href={onRampURL} target="_blank">
        <StyledButton
          variant="contained"
          href={onRampURL}
          color="primary"
          // sx={...sx}
        >
          {buttonText}
        </StyledButton>
      </Link>
    </div>
  );
}

export default CoinbaseButton;
