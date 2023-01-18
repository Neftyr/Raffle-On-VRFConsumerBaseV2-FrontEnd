import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <nav className="p-5 flex flex-row dark:bg-slate-800">
            <h1 className="py-4 px-4 font-bold text-3xl"> Decentralized Lottery</h1>
            <div className="absolute top-8 right-0">
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}
