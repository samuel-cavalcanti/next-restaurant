import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import logo from './components/logo'

export default function Home() {

  const restaurantTitle = ' Bem vindo ao Next Restaurant'
  const headerTitle = 'Next Restaurant'
  const subTitle = 'Escolha um prato'

  const plates = [
    { title: 'Quero Café', description: 'Café de verdade não tem leite', name: 'Café' },
    { title: 'Café, eu quero', description: 'Café de verdade não tem açúcar', name: 'Café' },
    { title: 'I could some coffee', description: `if the truth is hurts they don't believe it`, name: 'Café' },
    { title: 'some coffee, I could', description: ' buy me a coffee  ☕', name: 'Café' },
  ]



  const cards = plates.map((plate, index) => (
    <Link key={index} href={`/aguarde/${plate.name}`} >
      <a  className={styles.card}>
        <h3>{plate.title}</h3>
        <p>{plate.description}</p>
      </a>
    </Link>
  ))


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

      {logo}
    </div>
  )
}
