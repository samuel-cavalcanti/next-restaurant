import { useRouter } from 'next/router'
import { Spinner } from 'react-bootstrap';
import styles from '../../styles/Home.module.css';
import React from 'react';
import logo from '../../components/logo';

export default function Wait() {

    const router = useRouter()

    const { plateName } = router.query;

    return (

        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title} style={{ margin: 50 }} >
                    Aguarde enquanto o {plateName} está sendo preparado
                    </h1>
                <Spinner animation="border" />
            </main>
            {logo}
        </div>

    )
}
