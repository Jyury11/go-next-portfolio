import { ChuiProvider } from "theme";
import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <ChuiProvider>
      <AnimatePresence exitBeforeEnter>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </AnimatePresence>
    </ChuiProvider>
  );
}

export default MyApp;
