import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import logo from "../components/logo";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

import { users } from "../src/servers/user";
import { AddPedidos, pedidos } from "../src/servers/pedidos";
import plates from "../src/servers/menu";

export default function Home() {
  const router = useRouter();
  const [count, setCount] = useState(0);

  const restaurantTitle = ` Bem vindo ${users[0].name}`;
  const headerTitle = "Next Restaurant";
  const subTitle = `Escolha um prato, total de pratos: ${count} `;
  /* 
  const plates = [
    {
      title: "Quero Café",
      description: "Café de verdade não tem leite",
      name: "Café",
    },
    {
      title: "Café, eu quero",
      description: "Café de verdade não tem açúcar",
      name: "Café",
    },
    {
      title: "I could some coffee",
      description: `if the truth is hurts they don't believe it`,
      name: "Café",
    },
    {
      title: "some coffee, I could",
      description: " buy me a coffee  ☕",
      name: "Bolo",
    },
  ]; */

  function handleAddPedidos(id) {
    const data = {
      numberTable: users[0].numberTable,
      idpedidos: id,
    };

    AddPedidos(data);
    console.log(pedidos);
    setCount(count + 1);
  }

  console.log(pedidos);

  function handleFinish() {
    const plate = { name: "Café" };
    router.push(`/aguarde/${plate.name}`);
  }

  const cards = plates.map((plate, index) => (
    <div
      className={styles.card}
      style={{ display: "flex", width: "50%" }}
      key={index}
      onClick={() => handleAddPedidos(plate.id)}
    >
      <a style={{ width: 200 }}>
        <h3>{plate.title}</h3>
        <p>{plate.description}</p>
      </a>
    </div>
  ));

  return (
    <div className={styles.container}>
      <Head>
        <title>{headerTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{restaurantTitle}</h1>

        <p className={styles.description}>{subTitle}</p>

        <div className={styles.grid}>{cards}</div>
        <Button variant="primary" type="button" onClick={handleFinish}>
          Finalizar Pedido
        </Button>
      </main>

      {logo}
    </div>
  );
}
