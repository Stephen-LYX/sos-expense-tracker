"use client"

import { useState } from "react"
import { signIn } from "next-auth/react" //Auth.js login function
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

function Login() {

    const [email, setEmail] = useState("") //Track email input 
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    // create a router obj
    const router = useRouter();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault() // this prevents the page from reloading 

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        if (!result?.error) {
            setMessage("Login successful!")
            setTimeout(() => router.push("/dashboard/budget"), 500)
        } else {
            setMessage("Incorrect email or password")
        } 
            
    }

    const handleGoogleLogin = () => {
        signIn("google", {callbackUrl: "/dashboard/budget"})
    }
    return (
        <main className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-card/80 backdrop-blur-md border border-border rounded-2xl shadow-lg p-8 animate-slideUp">
                <div className="flex flex-col items-center gap-3 mb-4">
                    <Image src="/sos-logo.svg" alt="SOS logo" width={64} height={64} />
                    <h1 className="text-2xl font-semibold">Welcome back</h1>
                    <p className="text-sm text-gray-500">Sign in to continue to your dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label className="flex flex-col gap-1">
                        <span className="text-sm">Email</span>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-input border border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
                            required
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span className="text-sm">Password</span>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-input border border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
                            required
                        />
                    </label>

                    <button type="submit" className="w-full py-2 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-95 transition cursor-pointer">
                        Sign in
                    </button>
                </form>

                {message && (
                    <div className={`mt-4 text-center text-sm ${message.includes("successful") ? "text-green-500" : "text-destructive"}`}>
                        {message}
                    </div>
                )}

                <div className="flex items-center text-center gap-3 my-5">
                    <div className="flex-1 h-px bg-border"></div>
                    <span className="text-sm text-gray-500">or</span>
                    <div className="flex-1 h-px bg-border"></div>
                </div>

                <button onClick={handleGoogleLogin} className="w-full py-2 rounded-md border border-border bg-transparent flex items-center justify-center gap-2 hover:opacity-95 transition cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48" fill="none"><path fill="#EA4335" d="M24 9.5c3.9 0 7.3 1.4 10 3.6l7.4-7.3C36.3 2 30.5 0 24 0 14.9 0 6.8 4.6 2.5 11.7l8.8 6.8C13.3 13.2 18.2 9.5 24 9.5z"/><path fill="#34A853" d="M46.5 24c0-1.6-.2-3.1-.6-4.6H24v8.7h12.7c-.6 3-2.6 5.6-5.5 7.3l8.4 6.5C43.9 37.3 46.5 31.1 46.5 24z"/></svg>
                    Continue with Google
                </button>

                <div className="text-sm text-center text-gray-500 mt-4">
                    <span>New here? </span>
                    <Link href="/register" className="text-primary hover:underline">Create an account</Link>
                </div>
            </div>
        </main>
    )
}

export default Login