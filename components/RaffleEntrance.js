import { useEffect, useState } from "react"
import { useWeb3Contract } from "react-moralis"
import { useMoralis } from "react-moralis"
import { ethers } from "ethers"
import { contractAddresses, contractAbi } from "../constants"
import { useNotification } from "web3uikit"

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
    // let entranceFee = ""

    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    // Pop-up notification
    const dispatch = useNotification()

    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {}, // This function does not take any arguments
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {}, // This function does not take any arguments
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {}, // This function does not take any arguments
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {}, // This function does not take any arguments
    })

    // Try to read raffle function
    async function updateUI() {
        // We had to wrap it into async function to use await
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numPlayersFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = (await getRecentWinner()).toString()
        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
            transactionListener()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Notification",
            position: "topR",
            icon: "bell",
        })
    }

    // Make Tx Listener To Update Raffle Once winner is picked
    // Come back here after Lesson 15 as it is currently delayed for 5 seconds

    const transactionListener = async function () {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const raffle = new ethers.Contract(raffleAddress, contractAbi, provider)

        await new Promise((resolve, reject) => {
            raffle.on("WinnerPicked", async () => {
                try {
                    await updateUI()
                    resolve()
                } catch (error) {
                    console.log(error)
                    reject(error)
                }
            })
        })
    }

    return (
        <div>
            {raffleAddress ? (
                <div>
                    <button
                        onClick={async function () {
                            await enterRaffle({
                                // It checks if transaction was successfully sent to MetaMask
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }}
                    >
                        Enter Raffle
                    </button>
                    Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH
                </div>
            ) : (
                <div>No Raffle Address Detected</div>
            )}
            <div>Number Of Players: {numPlayers}</div>
            <div>Last Winner: {recentWinner}</div>
        </div>
    )
}
