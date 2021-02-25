import React from "react";
import RegisterPage from "../components/registerPage";


export default function cadastro() {

    const submit = (client) => {
        console.log(client)
    }

    const register = <RegisterPage submit={submit.bind(this)}/>


    return (
        register
    );
}
