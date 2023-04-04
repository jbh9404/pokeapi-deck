import PokemonMain from "@/src/componenets/PokemonMain";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pokemon List</title>
        <meta name="description" content="포켓몬 도감 메인페이지입니다." />
        <meta name="keywords" content="포켓몬, 도감, 검색, Pokemon" />
        <meta property="og:title" content="Pokemon List Page" key="title" />
      </Head>
      <PokemonMain />
    </div>
  );
}
