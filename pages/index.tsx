import PokemonMain from "@/src/componenets/PokemonMain";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pokemon List</title>
        <meta property="og:title" content="Pokemon List Page" key="title" />
      </Head>
      <PokemonMain />
    </div>
  );
}
