import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";

import { AddUser, users } from "../src/servers/user";

export default function cadastro() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [CPF, setCPF] = useState("");
  const [mesa, setMesa] = useState("");

  const cpfMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (name === "" || CPF.length !== 14 || mesa === "") {
      alert("todos os campos são obrigatório");
    }

    const data = {
      name,
      cpf: CPF,
      numberTable: mesa,
    };

    AddUser(data);
    console.log("users", users);
    router.push("/pedidos");
  }

  console.log("users", users);

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: 50 }}>
        Bem vindo ao Next Restaurant
      </h1>
      <div
        style={{
          maxWidth: 500,
          minWidth: 300,
          margin: "auto",
          padding: 20,
        }}
      >
        <h2>Cadastro</h2>
        <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome..."
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="text"
              value={CPF}
              onChange={(e) => setCPF(cpfMask(e.target.value))}
              placeholder="CPF..."
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Número da mesa</Form.Label>
            <Form.Control
              type="text"
              value={mesa}
              onChange={(e) => setMesa(e.target.value.replace(/\D/gim, ""))}
              placeholder="Numero..."
              maxLength="3"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
