"use client"

import { signOut } from "next-auth/react"

function SignOutBtn() {

    return (
        <button onClick={() => signOut({ callbackUrl: "/login"})} className="cursor-pointer">
            Log Out
        </button>
    )
}

export default SignOutBtn