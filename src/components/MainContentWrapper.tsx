"use client"

import { usePathname } from "next/navigation"
import { Children } from "react"

function MainContentWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const hideNav = pathname === "/login" || pathname === "/register"
    return (
        <main className={hideNav ? "min-h-screen" : "ml-56 p-6 min-h-screen"}>
            {children}
        </main>
    )
}

export default MainContentWrapper