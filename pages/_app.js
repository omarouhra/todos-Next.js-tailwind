import Head from "next/head";
import "tailwindcss/tailwind.css";
import '../style/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
