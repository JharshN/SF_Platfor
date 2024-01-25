import {
  ChakraProvider,
  extendTheme,
  ThemeConfig,
} from "@chakra-ui/react";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import { type AppProps } from "next/app";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import AuthContextProvider from "@/context";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";


const inter = Inter({ subsets: ["latin"] });
const supabaseUrl = "https://qgkjakomwapzuhvnrvgr.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient({ supabaseUrl, supabaseKey })
  );
  const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: true,
  };

  const theme = extendTheme({ config });

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Analytics />

      <Head>
        <title>Shiksha Finder</title>
        <meta property="og:title" content="Shiksha Finder" key="title" />
      </Head>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <div className={inter.className}>
            <Navbar />
          </div>
          <Component {...pageProps} />
        </AuthContextProvider>
      </ChakraProvider>
    </SessionContextProvider>
  );
}
