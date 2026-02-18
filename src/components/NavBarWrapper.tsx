"use client"

import { usePathname } from "next/navigation"
import Nav from "./Nav"


function NavBarWrapper() {

    const pathname = usePathname()
    const hideNav = pathname === "/login" || pathname === "/register"

    if (hideNav) return null;

    return <Nav pathname={pathname} />
}

export default NavBarWrapper