// Used Link component as opposed to <a> because:
//   1. Client-side routing: Swaps content without a full page refresh.
//   2. Prefetching: Background-loads linked pages for instant transitions.
//   3. State: Keeps the React state (like variables/inputs) alive.
import Link from "next/link"
import SignOutBtn from "./SignOutBtn"

type NavProps = {
    pathname: string
}

function Nav({pathname}: NavProps) {
    const navItems = [
        { 
            href: "/", 
            label: "Home", 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        { 
            href: "/dashboard/budget", 
            label: "Budget", 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        { 
            href: "/dashboard/account", 
            label: "Account", 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        { 
            href: "/dashboard/report", 
            label: "Report", 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
    ]

    return (
        <nav className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 shadow-2xl">
            {/* Logo/Brand */}
            <div className="px-6 py-8 border-b border-white/20">
                <Link href="/" className="flex items-center justify-center gap-3 group">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                        <span className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">$</span>
                    </div>
                    <span className="text-3xl font-bold text-white tracking-tight">SOS</span>
                </Link>
                <p className="text-center text-blue-200 text-xs mt-2 font-medium">Expense Tracker</p>
            </div>

            {/* Navigation Items */}
            <ul className="px-3 py-6 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <li key={item.href}>
                            <Link 
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                    isActive 
                                        ? 'bg-white text-blue-600 shadow-lg' 
                                        : 'text-white hover:bg-white/10 hover:translate-x-1'
                                }`}
                            >
                                <span className={`transform transition-transform group-hover:scale-110 ${
                                    isActive ? 'text-blue-600' : 'text-blue-200'
                                }`}>
                                    {item.icon}
                                </span>
                                <span className={`font-medium ${
                                    isActive ? 'text-blue-600' : 'text-white'
                                }`}>
                                    {item.label}
                                </span>
                            </Link>
                        </li>
                    )
                })}
            </ul>

            {/* Sign Out Button at Bottom */}
            <div className="absolute bottom-6 left-0 right-0 px-3">
                <SignOutBtn />
            </div>
        </nav>
    )
}

export default Nav