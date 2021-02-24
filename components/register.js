import React, {useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";


export default function Register(props) {

    const emptyState = ""

    const submit = props.submit

    const [name, setName] = useState(emptyState)

    const [CPF, setCPF] = useState(emptyState)

    const [showAlert, setShowAlert] = useState(false)

    const alertElement = showAlert ? <Alert variant={"danger"}>Todos os campos são obrigatório</Alert> : <></>


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
        if (name === "" || CPF.length !== 14) {
            return setShowAlert(true);
        }

        const data = {
            name,
            cpf: CPF,
        };

        submit(data)
    }


    return (
        <>
            <h1 style={{textAlign: "center", marginTop: 50}}>
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
                <h5 style={{textAlign: "center"}}>Por favor digite seu nome e CPF</h5>
                <Form onSubmit={handleSubmit} style={{width: "100%"}}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            type="text"
                            value={CPF}
                            onChange={(e) => setCPF(cpfMask(e.target.value))}
                            placeholder="CPF"
                        />
                    </Form.Group>
                    {alertElement}
                    <Button style={{marginRight: "auto", marginLeft: "auto", display: "flex"}} variant="primary"
                            type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    );
}
