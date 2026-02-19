"use client"

import { useState } from "react"
import { addBudgetItem } from "@/app/dashboard/budget/action"

export default function NewButton() {

    const [isOpen, setIsOpen] = useState(false)

    // state for the numeric values of amountLimit & spent 
    const [amount, setAmount] = useState<number>(0)
    const [spent, setSpent] = useState<number>(0)
    const [message, setMessage] = useState("")

    const remaining = amount - spent

    async function handleSubmit(formData: FormData) {

        try {
            await addBudgetItem(formData)
            setMessage("Saved!")
            setIsOpen(false)
            setTimeout(() => {
                setMessage("")
            }, 2000);
        } catch (error) {
            setMessage("An error has occurred, please try again")
        }
        
    }

    return (
        <div>
            {/* Modern gradient button */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 cursor-pointer min-w-[160px] h-[44px]"
            >
                <span className="text-xl leading-none">+</span>
                New Budget
            </button>

            {isOpen && (
                <>
                    {/* Backdrop with animation - Light grey blur */}
                    <div 
                        className="fixed inset-0 bg-gray-200 bg-opacity-40 z-40 backdrop-blur-md animate-fadeIn"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal container */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                        <form 
                            action={handleSubmit} 
                            className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto transform transition-all animate-slideUp"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Form header */}
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Budget</h2>
                            
                            {/* Title input */}
                            <div className="mb-5">
                                <label htmlFor="budget-title" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Title
                                </label>
                                <input 
                                    id="budget-title" 
                                    name="title" 
                                    required 
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    placeholder="e.g., Monthly groceries"
                                />
                            </div>

                            {/* Amount input */}
                            <div className="mb-5">
                                <label htmlFor="amountLimit" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Budget Amount
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3.5 text-gray-500 font-medium">$</span>
                                    <input 
                                        id="amountLimit" 
                                        name="amountLimit" 
                                        step="0.01" 
                                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        type="number"
                                        placeholder="0.00"
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            {/* Spent input */}
                            <div className="mb-5">
                                <label htmlFor="spent" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Amount Spent
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3.5 text-gray-500 font-medium">$</span>
                                    <input 
                                        id="spent" 
                                        name="spent" 
                                        step="0.01" 
                                        type="number"
                                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        placeholder="0.00"
                                        onChange={(e) => setSpent(Number(e.target.value))} 
                                    />
                                </div>
                            </div>

                            {/* Remaining display */}
                            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
                                <p className="text-sm text-gray-600">Remaining Budget</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    ${remaining.toFixed(2)}
                                </p>
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-3">
                                <button 
                                    type="submit"
                                    className="flex-1 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                                >
                                    Save Budget
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setIsOpen(false)}
                                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}

            {/* Success message toast */}
            {message && (
                <div className="fixed top-4 right-4 z-50 animate-slideDown">
                    <div className="bg-linear-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-semibold">{message}</span>
                    </div>
                </div>
            )}
        </div>
    )
}