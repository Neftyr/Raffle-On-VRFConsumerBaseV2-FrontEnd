// This is MANUAL and more complicated version of "Header"

import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    // useMoralis is hook, hooks let us keep track of state in our application
    // Hooks can also rerender our page after state change
    const { enableWeb3, account, isWeb3Enabled } = useMoralis()

    // Without below after refreshing page we will still see "Connect" button even if we are connected. To solve it we use "useEffect" as below
    // Below takes 2 parameters, 1: It takes function, 2: Takes dependency array. It will keep checking this dependency array and if anything in that array
    // changes it's going to call that 1st function parameter and rerender frontend.
    // If we pass it arguments for array [] so [isWeb3Enabled] it will automatically run on load and if anything changes in that array
    // If we do not pass it array, so just delete [] it will run anytime something rerenders
    // If we give it blank [] it will just run once on load
    useEffect(() => {
        console.log("Hi!")
        console.log(isWeb3Enabled)
    }, [isWeb3Enabled])

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
                    }}
                >
                    Connect
                </button>
            )}
        </div>
    )
}
