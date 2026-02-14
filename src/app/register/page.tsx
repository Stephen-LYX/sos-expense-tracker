"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"

function Login() {
    
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
        signIn("google", {callbackUrl: "/budget"})
    }
    return (
        <main className="min-w-screen min-h-screen flex flex-col justify-center items-center">
            <div className="border rounded-lg p-12  flex flex-col min-h-[50vh]">
                <div className="flex justify-center items-center pb-3">
                    <Image 
                        src="/user.png" 
                        alt="sign in icon"
                        width={60}
                        height={60}
                    />
                </div>
                
                <h3 className="text-center pb-4">Create an Account:</h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <div>
                            <label htmlFor="username" className="block">Username:</label>
                            <input 
                                type="text"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border pl-0.5 w-full"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="name" className="block">Name:</label>
                            <input 
                                type="text"
                                id="name"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border pl-0.5 w-full"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block">Email:</label>
                            <input 
                                type="email"
                                id="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border pl-0.5 w-full"
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block">Password:</label>
                            <input 
                                type="password"
                                id="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border pl-0.5 w-full"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="cursor-pointer border my-2">
                        Create Account
                    </button>
                </form>

                {message && (
                    <p className={`text-center text-sm mt-2 `}></p>
                )}

                <div className="flex items-center text-center gap-2">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="text-gray-500">or</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <button onClick={handleGoogleLogin} className="border cursor-pointer mt-2">
                    Log In With Google
                </button>

                <Link href="/login" className="text-sm text-center text-gray-600 mt-2">
                    Have an account? Login here.
                </Link>
            </div>
        </main>
    )
}

export default Login