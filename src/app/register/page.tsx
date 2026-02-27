"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"

function Register() {
    
    const [username, setUsername] = useState("") //Track username input
    const [name, setName] = useState("") //Track name input
    const [email, setEmail] = useState("") //Track email input 
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault() // this prevents the page from reloading 
        setIsLoading(true)
        setMessage("")
        
        try {
            const response = await fetch("/api/register" , {
                method: "POST", 
                headers: { "Content-Type": "application/json"}, 
                body: JSON.stringify({ username, email, name, password})
            })

            const data = await response.json()

            if (response.ok) {
                setMessage("Success! Redirecting to login...")
                setTimeout(() => {
                    router.push("/login")
                }, 2000)
            } else {
                setMessage(data.message || "Registration failed")
            }
        } catch (error) {
            setMessage("A network error occurred.")
        } finally {
            setIsLoading(false)
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
                    <h1 className="text-2xl font-semibold">Create your account</h1>
                    <p className="text-sm text-gray-500">Start tracking your expenses in seconds</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-3">
                        <label className="flex flex-col gap-1">
                            <span className="text-sm">Username</span>
                            <input
                                type="text"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 rounded-md bg-input border border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
                                required
                            />
                        </label>

                        <label className="flex flex-col gap-1">
                            <span className="text-sm">Name</span>
                            <input
                                type="text"
                                id="name"
                                placeholder="Full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 rounded-md bg-input border border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
                                required
                            />
                        </label>

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
                                placeholder="At least 8 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-md bg-input border border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
                                required
                            />
                        </label>
                    </div>

                    <button type="submit" className="w-full py-2 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-95 transition cursor-pointer">
                        Create account
                    </button>
                </form>

                {message && (
                    <p className={`mt-3 text-center text-sm ${message.includes("Success") ? "text-green-500" : "text-destructive"}`}>{message}</p>
                )}

                <div className="flex items-center text-center gap-3 my-5">
                    <div className="flex-1 h-px bg-border"></div>
                    <span className="text-sm text-gray-500">or</span>
                    <div className="flex-1 h-px bg-border"></div>
                </div>

                <button onClick={handleGoogleLogin} className="w-full py-2 rounded-md border border-border bg-transparent flex items-center justify-center gap-2 hover:opacity-95 transition cursor-pointer">
                    Continue with Google
                </button>

                <div className="text-sm text-center text-muted mt-4">
                    <Link href="/login" className="text-primary hover:underline">Have an account? Login here.</Link>
                </div>
            </div>
        </main>
    )
}

export default Register