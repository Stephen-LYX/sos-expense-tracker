"use client"

import { signOut } from "next-auth/react"

function SignOutBtn() {

    return (
        <button 
            onClick={() => signOut({ callbackUrl: "/login"})} 
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 font-medium border border-white/20 hover:border-white/40 group"
        >
            <svg className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
        </button>
    )
}

export default SignOutBtn