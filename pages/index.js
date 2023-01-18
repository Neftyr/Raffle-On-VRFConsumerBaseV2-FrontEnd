import Head from "next/head"
import styles from "../styles/Home.module.css"
import Header from "../components/Header"
import RaffleEntrance from "../components/RaffleEntrance"

export default function Home() {
    return (
        <div>
            <Head>
                <title>Raffle Smart Contract</title>
            </Head>

            <Header />
            <RaffleEntrance />
        </div>
    )
}
