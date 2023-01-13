import Head from "next/head"
import styles from "../styles/Home.module.css"
import ManualHeader from "../components/ManualHeader"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Raffle Smart Contract</title>
            </Head>
            Hello!
            <ManualHeader />
        </div>
    )
}
