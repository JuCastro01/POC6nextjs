"use client";

import { useState, useEffect } from "react";
import styles from './page.module.css';
import data from './filme.json';


const MovieHeader = ({ title, time }) => (
  <div className={styles["movie-info"]}>
    <h1>{title}</h1>
    <p>{time}</p>
  </div>
);


const Seat = ({ number, status, onClick }) => (
  <div
    className={`${styles.seat} ${styles[status]}`}
    onClick={onClick}
  >
    {number}
  </div>
);


const Screen = () => (
  <div className={styles.screen}>Tela</div>
);


const Legend = () => (
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
);


const MovieDetails = ({ synopsis, releaseDate, director }) => (
  <div className={styles.rightSection}>
    <h2>Sinopse do filme</h2>
    <p>{synopsis}</p>
    <p><strong>Data de lançamento:</strong> {releaseDate}</p>
    <p><strong>Direção:</strong> {director}</p>
  </div>
);


const BuyButton = ({ selectedSeats, price, onClick }) => {
  const totalPrice = selectedSeats * price;
  
  const handlePurchase = () => {
    onClick();
    alert('Compra realizada com sucesso!');
  };

  return (
    <button className={styles["buy-button"]} onClick={handlePurchase}>
      Comprar
      <br />
      R$ {totalPrice.toFixed(2)}
    </button>
  );
};


export default function Home() {
  const [assentos, setAssentos] = useState(data.assentos);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addListener(handleChange);

    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const selecionarAssento = (numero) => {
    setAssentos((prevAssentos) =>
      prevAssentos.map((assento) =>
        assento.numero === numero
          ? { ...assento, selecionado: !assento.selecionado }
          : assento
      )
    );
  };

  const comprarAssentos = () => {
    setAssentos((prevAssentos) =>
      prevAssentos.map((assento) =>
        assento.selecionado
          ? { ...assento, disponivel: false, selecionado: false }
          : assento
      )
    );
  };

  const assentosSelecionados = assentos.filter(a => a.selecionado).length;

  return (
    <div data-theme={theme} className={styles.container}>
      <div className={styles.leftSection}>
        <MovieHeader title={data.titulo} time={data.horario} />
        <div className={styles.seating}>
          <div className={styles.grid}>
            {assentos.map((assento) => (
              <Seat
                key={assento.numero}
                number={assento.numero}
                status={
                  assento.selecionado
                    ? 'selected'
                    : assento.disponivel
                    ? 'available'
                    : 'unavailable'
                }
                onClick={() => assento.disponivel && selecionarAssento(assento.numero)}
              />
            ))}
          </div>
          <Screen />
          <Legend />
        </div>
        <BuyButton
          selectedSeats={assentosSelecionados}
          price={data.preco}
          onClick={comprarAssentos}
        />
      </div>
      <MovieDetails
        synopsis={data.sinopse}
        releaseDate={data.dataLancamento}
        director={data.direcao}
      />
    </div>
  );
}
