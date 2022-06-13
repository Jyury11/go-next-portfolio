import { ChuiProvider } from "theme";
import type { AppProps } from "next/app";
import * as React from "react";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <ChuiProvider>
      <AnimatePresence exitBeforeEnter>
        <Component key={router.asPath} {...pageProps} />
      </AnimatePresence>
    </ChuiProvider>
  );
}
export default MyApp;
