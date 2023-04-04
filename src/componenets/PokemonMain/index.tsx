import useDebounce from "@/src/libs/hooks/useDebounce";
import useIntersectionObserver from "@/src/libs/hooks/useIntersectionObserver";
import styles from "@/styles/pokemon/pokemonMain.module.scss";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useLoadingStore } from "@/src/libs/stores/useLoadingStore";
import Image from "next/image";
import { apiUrl, picUrl } from "@/src/libs/api/apiStatic";
import Spinner from "@/src/assets/etc/Spinner";

const perPage = 20;

export default function PokemonMain() {
  const router = useRouter();
  const [pokemons, setPokemons] = useState<Array<any>>([]);
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>({});

  const isLoading = useLoadingStore((state: any) => state.isLoading);
  const on = useLoadingStore((state: any) => state.on);
  const off = useLoadingStore((state: any) => state.off);

  const targetRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(targetRef, {});
  const isEndVisible = !!entry?.isIntersecting;
  const debouncedValue = useDebounce<boolean>(isEndVisible, 500);

  const enterKey = (e: any): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    on();
    try {
      const res = await axios.get(`${apiUrl}/${searchText}`);
      console.log(res.data);
      setSearchResult(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      off();
    }
  };

  useEffect(() => {
    (async () => {
      // on();
      console.log(debouncedValue);
      if (debouncedValue) {
        try {
          const response = await axios.get(
            `${apiUrl}?limit=${perPage}&offset=${(page - 1) * perPage}`
          );
          console.log(response.data.results);
          setPokemons(pokemons.concat(response.data.results));
          setPage(page + 1);
        } catch (error) {
          console.error(error);
        } finally {
          // off();
        }
      }
    })();
  }, [debouncedValue]);

  return (
    <div className={styles.pokemonMain}>
      <div className={styles.header}>
        <Image
          src="/logo.png"
          width={200}
          height={70}
          alt={`image ${searchResult.id}`}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSearchResult({});
            router.push("/");
          }}
        />
        <div>
          <input
            type="number"
            value={searchText}
            placeholder="숫자로 검색"
            onChange={(e) => setSearchText(e.target.value)}
            onKeyUp={enterKey}
          />
          <button onClick={handleSearch}>검색</button>
        </div>
      </div>
      {isLoading ? (
        <div className={styles.loadingWrap}>
          <Spinner width="70px" height="70px" />
        </div>
      ) : (
        <>
          {Object.keys(searchResult).length > 0 ? (
            <div
              className={styles.card}
              onClick={() => router.push(`/detail?idx=${searchResult.id}`)}
            >
              <div className={styles.numbering}>{searchResult.id}</div>
              <Image
                src={`${picUrl}/${searchResult.id}.png`}
                width={150}
                height={150}
                alt=""
              />
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              {pokemons.map((n: any, index) => (
                <div
                  className={styles.card}
                  key={index}
                  onClick={() => router.push(`/detail?idx=${index + 1}`)}
                >
                  <div className={styles.numbering}>{index + 1}</div>
                  <Image
                    src={`${picUrl}/${index + 1}.png`}
                    width={150}
                    height={150}
                    alt=""
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <div style={{ height: "0px" }} ref={targetRef} />
    </div>
  );
}
