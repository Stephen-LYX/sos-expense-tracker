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
        <main className="min-w-screen min-h-screen flex flex-col justify-center items-center">
            <div className="border rounded-lg p-12  flex flex-col">
                <div className="flex justify-center items-center pb-5">
                    <Image 
                        src="/user.png"
                        alt="sign in icon"
                        width={60}
                        height={60}
                    />
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col h-[20vh] gap-2">
                    <div>
                        <div className="">
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
                        Sign in
                    </button>
                </form>

                {message && (
                    <div className={`text-center ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
                        {message}
                    </div>
                )}

                <div className="flex items-center text-center gap-2">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="text-gray-500">or</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <button onClick={handleGoogleLogin} className="border cursor-pointer mt-2">
                    Log In With Google
                </button>
                
                <div className="text-sm text-center text-gray-600 mt-2">
                    <span>Don't have an account, </span>
                    <Link href="/register" className=" hover:text-blue-600 hover:underline transition-colors">
                        sign up here.
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default Login