import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/pokemon/detailInfo.module.scss";
import Image from "next/image";
import { useLoadingStore } from "@/src/libs/stores/useLoadingStore";
import { apiUrl } from "@/src/libs/api/apiStatic";
import Spinner from "@/src/assets/etc/Spinner";

export default function DetailInfo() {
  const router = useRouter();
  const idx = router.query.idx;

  const isLoading = useLoadingStore((state: any) => state.isLoading);
  const on = useLoadingStore((state: any) => state.on);
  const off = useLoadingStore((state: any) => state.off);

  const [data, setData] = useState<any>({});
  const [specData, setSpecData] = useState<any>({});
  const [korName, setKorName] = useState<string>("");
  const [evolutionChain, setEvolutionChain] = useState<any>([]);

  useEffect(() => {
    if (router && idx) {
      (async () => {
        on();
        try {
          const res: any = await axios.get(`${apiUrl}/${idx}`);
          setData(res.data);
          const resSpecies = await axios.get(`${res.data.species.url}`);
          setSpecData(resSpecies.data);
          const korean = resSpecies.data.names.find(
            (value: any) => value.language.name === "ko"
          )?.name;
          setKorName(korean);
          const evolutionChainIdx = resSpecies.data.evolution_chain.url
            .split("/")
            .slice(-2, -1)[0];
          const resEvolution = await axios.get(
            `https://pokeapi.co/api/v2/evolution-chain/${evolutionChainIdx}`
          );
          setEvolutionChain(resEvolution.data.chain);
        } catch (error) {
          console.log(error);
        } finally {
          off();
        }
      })();
    }
  }, [idx]);

  if (isLoading)
    return (
      <div className={styles.loadingWrap}>
        <Spinner width="50px" height="50px" />
      </div>
    );

  return (
    <div className={styles.detailInfo}>
      <div className={styles.header}>
        <Image
          className={styles.back}
          src="/back.png"
          width={10}
          height={18}
          alt="back"
          onClick={() => window.history.back()}
        />
        <span>{korName}</span>
      </div>
      <div className={styles.detailWrap}>
        <Image
          src={data?.sprites?.front_default || "/blank.png"}
          width={150}
          height={150}
          alt={`image ${data?.sprites?.front_default}`}
        />
        <div className={styles.infoWrap}>
          <div className={styles.subTitle}>기본정보</div>
          <div className={styles.eachLine}>name: {specData.name}</div>
          <div className={styles.eachLine}>
            color: &nbsp;
            <div
              style={{
                width: 10,
                height: 10,
                display: "inline-block",
                background: specData.color?.name,
                borderRadius: "50%",
              }}
            ></div>
          </div>
          <div className={styles.eachLine}>
            habitat: {specData.habitat?.name || "none"}
          </div>
          <div className={styles.eachLine}>
            generation: {specData.generation?.name || "none"}
          </div>
          <div className={styles.eachLine}>
            shape: {specData.shape?.name || "none"}
          </div>
          <div className={styles.eachLine}>weight: {data.weight || "none"}</div>
          <div className={styles.eachLine}>height: {data.height || "none"}</div>
        </div>
        {evolutionChain && (
          <div className={styles.evolutionWrap}>
            <div className={styles.subTitle}>진화 단계</div>
            {evolutionChain?.evolves_to?.length === 0 ? (
              <p>진화 가능한 단계가 없습니다.</p>
            ) : (
              evolutionChain?.evolves_to?.map((chain: any) => (
                <div key={chain.species.name}>
                  <div>{chain.species.name}</div>
                  {chain.evolves_to.length > 0 && (
                    <div>
                      {chain.evolves_to.map((subChain: any) => (
                        <div key={subChain.species.name}>
                          <div>{subChain.species.name}</div>
                          {subChain.evolves_to.length > 0 && (
                            <div>
                              {subChain.evolves_to.map((subSubChain: any) => (
                                <div key={subSubChain.species.name}>
                                  {subSubChain.species.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
