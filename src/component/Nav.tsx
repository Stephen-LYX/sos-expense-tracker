// Used Link component as opposed to <a> because:
//   1. Client-side routing: Swaps content without a full page refresh.
//   2. Prefetching: Background-loads linked pages for instant transitions.
//   3. State: Keeps the React state (like variables/inputs) alive.
import Link from "next/link"

function Nav() {
    return (
        <nav className="fixed left-0 top-0 h-screen w-56 bg-white border-r border-gray-200 text-center">
            <ul className="text-2xl">
                <li className="text-5xl pt-6 pb-5"><Link href="/">SOS</Link></li>
                <li className="pt-5 pb-5 border"><Link href="/">Home</Link></li>
                <li className="pt-5 pb-5 border"><Link href="/budget">Budget</Link></li>
                <li className="pt-5 pb-5 border"><Link href="/account">Account</Link></li>
                <li className="pt-5 pb-5 border"><Link href="/report">Report</Link></li>
            </ul>
        </nav>
    )
}

export default Nav