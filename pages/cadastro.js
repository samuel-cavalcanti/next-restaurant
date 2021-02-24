import React from "react";
import Register from "../components/register";


export default function cadastro() {

    const submit = (client) => {
        console.log(client)
    }

    const register = <Register submit={submit.bind(this)}/>


    return (
        register
    );
}
