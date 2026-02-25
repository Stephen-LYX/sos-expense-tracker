"use client"

import { useState } from "react"
import { updateBalanceAction } from "@/app/dashboard/account/action"
import { Pencil, Check, X } from "lucide-react"

type BalanceCardProps = {
    accountId: number | undefined
    displayBalance: string
}

export default function BalanceCard({ accountId, displayBalance }: BalanceCardProps) {
    // track if we are in edit mode
    const [isEditing, setIsEditing] = useState(false)

    // actual displayed balance (Source of truth for the UI)
    const [balance, setBalance] = useState(displayBalance)

    // local state for the input field/ temp value 
    const [tempbalance, setTempBalance] = useState(displayBalance)

    const handleSave = async () => {
        // Optimization: Don't call the database if the value hasn't changed
        if (tempbalance === balance) {
            setIsEditing(false);
            return;
        }

        try {
            await updateBalanceAction(Number(tempbalance), Number(accountId))
            setBalance(tempbalance)
            setIsEditing(false)
        } catch (error) {
            console.error("Failed to update balance:", error)
            // Optional: add error handling UI here
        }
    }

    return (
        <div className="border rounded-xl p-5 bg-white shadow-sm max-w-md transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    {isEditing ? (
                        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-200">
                            <span className="text-gray-500 font-medium whitespace-nowrap">
                                Custom balance:
                            </span>
                            
                            <div className="flex items-center border-b-2 border-blue-500 pb-1">
                                <span className="text-gray-400 mr-1 font-semibold">$</span>
                                <input 
                                    type="number"
                                    step="0.01"
                                    value={tempbalance}
                                    onChange={(e) => setTempBalance(e.target.value)}
                                    placeholder={balance} 
                                    className="bg-transparent outline-none font-bold text-gray-800 w-28 text-lg"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSave()
                                        if (e.key === "Escape") {
                                            setTempBalance(balance) // Reset temp value
                                            setIsEditing(false)
                                        }
                                    }}
                                />
                            </div>

                            <div className="flex items-center gap-1">
                                <button 
                                    onClick={handleSave} 
                                    className="p-1.5 hover:bg-green-50 rounded-full transition-colors text-green-600 active:scale-90"
                                    title="Save"
                                >
                                    <Check size={20} strokeWidth={3} />
                                </button>
                                <button 
                                    onClick={() => {
                                        setTempBalance(balance)
                                        setIsEditing(false)
                                    }}
                                    className="p-1.5 hover:bg-red-50 rounded-full transition-colors text-red-600 active:scale-90"
                                    title="Cancel"
                                >
                                    <X size={20} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 font-medium">Custom balance:</span>
                            <span className="text-2xl font-bold text-gray-900 tracking-tight">
                                ${Number(balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    )}
                </div>

                {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="ml-4 p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all active:scale-95"
                        aria-label="Edit balance"
                    >
                        <Pencil size={18} />
                    </button>
                )}
            </div>
        </div>
    )
}