import styles from '../styles/Home.module.css'
import Image from "next/image";

const logo = (<footer className={styles.footer}>
    <a>
        Desenvolvido pela &nbsp;<strong style={{marginRight:8}}>Sem Condições software house</strong>
        <Image src="/code_for_food.jpg" alt="Sem condições Logo" width={135.688} height={80} />
    </a>
</footer>)


export default logo
