import styles from "../styles/Home.module.css"
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { ethers } from "ethers"

let web3Modal

// We want to specify which wallets do we want to use
const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            rpc: { 5: process.env.NEXT_PUBLIC_RPC_URL },
        },
    },
}

if (typeof window !== "undefined") {
    web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions, // required
    })
}

export default function Home() {
    async function connect() {
        web3Modal = new Web3Modal({
            cacheProvider: false,
            providerOptions, // required
        })
        const web3ModalProvider = await web3Modal.connect()
        // const provider = new ethers.providers.Web3Provider(web3ModalProvider)
    }

    return (
        <div>
            <button onClick={() => connect()}>Connect</button>
        </div>
    )
}
