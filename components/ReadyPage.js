import styles from "../styles/Home.module.css";
import logo from "./logo";
import React from "react";

export default function ReadyPage(props) {


    return (<div className={styles.container}>
        <main className={styles.main}>
            <h1 className={styles.title} style={{margin: 50}}>
                Seu {props.dish.name} está pronto
            </h1>
        </main>
        {logo}
    </div>)

}

