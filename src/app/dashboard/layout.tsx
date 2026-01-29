// guard for dashboard pages

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

async function DashBoardLayout({children}: {children: ReactNode}) {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

    return <>{children}</>
    
}

export default DashBoardLayout