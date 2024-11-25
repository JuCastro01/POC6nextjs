"use client";

import { useState } from "react";
import Head from "next/head";
import styles from "./page.module.css";
import data from './filme.json'; // Importa o arquivo JSON

export default function Home() {
  // Cria um estado para armazenar os assentos
  const [assentos, setAssentos] = useState(data.assentos);

  // Função para selecionar/deselecionar assentos
  const selecionarAssento = (numero) => {
    setAssentos((prevAssentos) =>
      prevAssentos.map((assento) =>
        assento.numero === numero
          ? { ...assento, selecionado: !assento.selecionado }
          : assento
      )
    );
  };

  // Função para comprar os assentos selecionados
  const comprarAssentos = () => {
    setAssentos((prevAssentos) =>
      prevAssentos.map((assento) =>
        assento.selecionado ? { ...assento, disponivel: false, selecionado: false } : assento
      )
    );
  };

  return (
    <>
      <Head>
        <title>{data.titulo}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles["movie-info"]}>
            <h1>{data.titulo}</h1>
            <p>{data.horario}</p>
          </div>
          <div className={styles.seating}>
            <div className={styles.grid}>
              {/* Geração das cadeiras com classes dinâmicas */}
              {assentos.map((assento) => (
                <div
                  key={assento.numero}
                  className={`${styles.seat} ${
                    assento.selecionado
                      ? styles.selected
                      : assento.disponivel
                      ? styles.available
                      : styles.unavailable
                  }`}
                  onClick={() => assento.disponivel && selecionarAssento(assento.numero)}
                >
                  {assento.numero}
                </div>
              ))}
            </div>
            <div className={styles.screen}>Tela</div>
            <div className={styles.legend}>
              <span className={styles["legend-item"]}>
                <div className={`${styles.seat} ${styles.available}`}></div> Livre
              </span>
              <span className={styles["legend-item"]}>
                <div className={`${styles.seat} ${styles.selected}`}></div> Selecionado
              </span>
              <span className={styles["legend-item"]}>
                <div className={`${styles.seat} ${styles.unavailable}`}></div> Indisponível
              </span>
            </div>
          </div>
          <button className={styles["buy-button"]} onClick={comprarAssentos}>
            Comprar
            <br />
            R$ {data.preco.toFixed(2)}
          </button>
        </div>
        <div className={styles.rightSection}>
          <h2>Sinopse do filme</h2>
          <p>{data.sinopse}</p>
          <p><strong>Data de lançamento:</strong> {data.dataLancamento}</p>
          <p><strong>Direção:</strong> {data.direcao}</p>
        </div>
      </div>
    </>
  );
}
