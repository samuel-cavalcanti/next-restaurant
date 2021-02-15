import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {

  const restaurantTitle = ' Bem vindo ao Next Restaurant'
  const headerTitle = 'Next Restaurant'
  const subTitle = 'Escolha um prato'

  const plates = [
    { title: 'Quero Café', description: 'Café de verdade não tem leite' },
    { title: 'Café, eu quero', description: 'Café de verdade não tem açúcar' },
    { title: 'I could some coffee', description: `if the truth is hurts they don't believe it` },
    { title: 'some coffee, I could', description: ' buy me a coffee  ☕' },
  ]

  const cards = plates.map((plate) => (
    <a className={styles.card}>
      <h3>{plate.title}</h3>
      <p>{plate.description}</p>
    </a>))


  return (
    <div className={styles.container}>
      <Head>
        <title>{headerTitle}</title>
        <link rel="icon" href="/favicon.ico" />
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

      <footer className={styles.footer}>
        <a>
          Desenvolvido pela &nbsp;<strong>Sem Condições software house</strong>
          <img src="/code_for_food.jpg" alt="Sem condições Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
