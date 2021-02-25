import styles from "../styles/Home.module.css";
import {Spinner} from "react-bootstrap";
import logo from "./logo";
import React from "react";

export default function ErrorPage(props) {

    return (

        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title} style={{margin: 50}}>
                   OPS, aconteceu algum erro, por favor, volte mais tarde
                </h1>
                <Spinner animation="border"/>
            </main>
            {logo}
        </div>

    )
}
