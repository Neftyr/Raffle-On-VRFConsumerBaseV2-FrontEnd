import { useEffect, useState } from "react"
import { useWeb3Contract } from "react-moralis"
import { useMoralis } from "react-moralis"
import { ethers } from "ethers"
import { contractAddresses, contractAbi } from "../constants"

export default function RaffleEntrance() {
    // "useMoralis" knows what is the network based on connected wallet from "Header" component
    // We can write below too as "const { chainIdHex } = useMoralis()", but here we just pull out the chainId object and rename it to chainIdHex
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    // It is shown in Console as hex format, so we parse it as integer
    const chainId = parseInt(chainIdHex)
    console.log(`ChainId is: ${parseInt(chainIdHex)}, ChainIdHex is: ${chainIdHex}`)

    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    // We are setting below variable of "entranceFee" to "0" and function "setEntranceFee" updating our state/frontend
    const [entranceFee, setEntranceFee] = useState("0")
    // Below won't work as it do not change state after page rerender
    //let entranceFee = ""

    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {}, // This function does not take any arguments
        msgValue: 0, //
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {}, // This function does not take any arguments
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            // Try to read raffle function
            async function updateUI() {
                // We had to wrap it into async function to use await
                const entranceFeeFromCall = (await getEntranceFee()).toString()
                setEntranceFee(ethers.utils.formatUnits(entranceFeeFromCall, "ether"))
            }
            updateUI()
        }
    }, [isWeb3Enabled])

    return <div>Entrance Fee: {entranceFee} ETH</div>
}
