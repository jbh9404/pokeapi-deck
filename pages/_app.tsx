import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import "@/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Pokemon card list" />
        <title>Pokemon Cards</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
