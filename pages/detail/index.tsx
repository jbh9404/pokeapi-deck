import DetailInfo from "@/src/componenets/DetailInfo";
import Head from "next/head";

export default function Detail() {
  return (
    <div>
      <Head>
        <title>Detail Info</title>
        <meta name="description" content="포켓몬 상세정보 페이지입니다." />
        <meta name="keywords" content="포켓몬, 상세정보, Pokemon" />
        <meta property="og:title" content="Pokemon detail info" key="title" />
      </Head>
      <DetailInfo />
    </div>
  );
}
