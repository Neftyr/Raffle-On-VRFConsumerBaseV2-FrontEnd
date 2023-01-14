// This is MANUAL and more complicated version of "Header"

import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    // useMoralis is hook, hooks let us keep track of state in our application
    // Hooks can also rerender our page after state change
    const { enableWeb3, account, isWeb3Enabled, Moralis, isWeb3EnableLoading, deactivateWeb3 } = useMoralis()

    // Without below after refreshing page we will still see "Connect" button even if we are connected. To solve it we use "useEffect" as below
    // Below takes 2 parameters, 1: It takes function, 2: Takes dependency array. It will keep checking this dependency array and if anything in that array
    // changes it's going to call that 1st function parameter and rerender frontend.
    // If we pass it arguments for array [] so [isWeb3Enabled] it will automatically run on load and if anything changes in that array
    // If we do not pass it array, so just delete [] it will run anytime something rerenders
    // If we give it blank [] it will just run once on load
    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])

    // Adding 2nd useEffect to see if we are disconnected
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("No account found")
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 10)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()

                        // We want to track if someone was connected recently to prevent auto pop of login MetaMask
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}
                    // This will grey out "Connect" button when MetaMask window is poped up
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}
