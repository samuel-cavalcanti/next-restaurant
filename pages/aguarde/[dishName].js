import {Spinner} from 'react-bootstrap';
import styles from '../../styles/Home.module.css';
import React from 'react';
import logo from '../../components/logo';


export async function getStaticPaths() {
    return {
        paths: [
            {
                params:
                    {
                        dishName: 'Café'
                    }
            }
        ],
        fallback: false
    }
}

export async function getStaticProps(context) {
    const dishName = context.params.dishName

    return {
        props: {
            dishName: dishName
        }
    }
}



export default function Wait(props) {

    return (

        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title} style={{margin: 50}}>
                    Aguarde enquanto o {props.dishName} está sendo preparado
                </h1>
                <Spinner animation="border"/>
            </main>
            {logo}
        </div>

    )
}
