import styles from "../styles/Home.module.css";
import logo from "../components/logo";
import React, { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";

import { pedidos } from "../src/servers/pedidos";

export default function Kitchen() {
  const initialState = [
    { id: 0, name: "Café", description: "com 2 colheres de açucar" },
    {
      id: 1,
      name: "Arroz com feijão",
      description: "retirar o feijão e o arroz, obrigado.",
    },
    { id: 2, name: "Macarrão 4 queijos", description: "" },
  ];

  console.log(pedidos);

  const [orders, setOrders] = useState(pedidos);

  const removeOrder = (index) => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title} style={{ margin: 50 }}>
          Lista de pedidos
        </h1>
        <ListGroup>
          {orders.map((order, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={() => removeOrder(index)}
            >
              <h3>mesa: {order.numberTable}</h3>
              <Card.Text>{order.title}</Card.Text>
              <Card.Text>{order.name}</Card.Text>
              <Card.Text>{order.description}</Card.Text>
            </div>
          ))}
        </ListGroup>
      </main>
      {logo}
    </div>
  );
}
