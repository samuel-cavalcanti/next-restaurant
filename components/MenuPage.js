import styles from "../styles/Home.module.css";
import Head from "next/head";
import logo from "./logo";

export default function MenuPage(props) {

    const restaurantTitle = ' Bem vindo ao Next Restaurant'
    const headerTitle = 'Next Restaurant'
    const subTitle = 'Escolha um prato'
    const dishes = props.dishes
    const selectDish = props.selectDish


    const cards = dishes.map((dish, index) => (
        <a key={index} className={styles.card} onClick={() => selectDish(dish)}>
            <h3>{dish.title}</h3>
            <p>{dish.description}</p>
        </a>
    ))


    return (
        <div className={styles.container}>
            <Head>
                <title>{headerTitle}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    {restaurantTitle}
                </h1>

                <p className={styles.description}>
                    {subTitle}
                </p>

                <div className={styles.grid}>
                    {cards}
                </div>
            </main>

            {logo}
        </div>
    )
}
