import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        // "moralisAuth=false" means we do not want to connect to any server
        // this button below does everything what we coded in ManualHeader.js
        <div>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
