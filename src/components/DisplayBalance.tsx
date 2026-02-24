"use client"

type account_balance = {
    id: number
    balance: string
}

type account_balance_props = {
    balance: account_balance[]
}

export default function DisplayBalance({balance}: account_balance_props) {

    return (
        <div>
            <h1>{balance[0]?.balance}</h1>
        </div>
    )
}