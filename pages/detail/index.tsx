import DetailInfo from "@/src/componenets/DetailInfo";
import Head from "next/head";

export default function Detail() {
  return (
    <div>
      <Head>
        <title>Detail Info</title>
        <meta property="og:title" content="Pokemon detail info" key="title" />
      </Head>
      <DetailInfo />
    </div>
  );
}
