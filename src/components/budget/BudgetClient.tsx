"use client"

import { updateBudgetField } from "@/app/dashboard/budget/action"
import { useState } from "react"
import { start } from "repl"

// defining the type for a single budget item
type BudgetItem = {
    id: number 
    title: string
    amountLimit: string // decimal comes as string from server
    spent: string 
    startDate: Date
    endDate: Date 
}

type BudgetClientProps = {
    budgets: BudgetItem[]
}

export default function BudgetClient ({budgets}: BudgetClientProps) {
    
    const [editingCell, setEditingCell] = useState<{rowId: number, field: string} | null>(null)
    const [tempValue, setTempValue] = useState<string>("")

    function startEdit(rowId: number, field: string, currentValue: string) {
        setEditingCell({rowId, field})
        setTempValue(currentValue)
    }

    async function saveEdit(rowId: number, field: string, updatedValue: string) {
        await updateBudgetField(rowId, field, updatedValue)
        cancelEdit()
    }

    function cancelEdit() {
        setEditingCell(null)
        setTempValue("")
    }

    return (
        <div className="w-full max-h-[600px] overflow-y-auto rounded-2xl shadow-xl bg-white scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <table className="w-full border-collapse">
                <thead className="sticky top-0 z-10">
                    <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Title</th>
                        <th className="px-6 py-4 text-right font-semibold text-sm uppercase tracking-wider">Budget</th>
                        <th className="px-6 py-4 text-right font-semibold text-sm uppercase tracking-wider">Spent</th>
                        <th className="px-6 py-4 text-right font-semibold text-sm uppercase tracking-wider">Remaining</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {budgets.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                <div className="flex flex-col items-center gap-3">
                                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="text-lg font-medium">No budget items yet</p>
                                    <p className="text-sm">Click "+ New Budget" to create your first budget</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        budgets.map((budget) => {
                            const remaining = Number(budget.amountLimit) - Number(budget.spent)
                            const percentSpent = (Number(budget.spent) / Number(budget.amountLimit)) * 100
                            
                            return (
                                <tr 
                                    key={budget.id} 
                                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                                >
                                    <td className="px-6 py-4">
                                        {
                                            editingCell?.rowId === budget.id && editingCell.field === "title" ? (
                                                <input 
                                                    type="text"
                                                    value={tempValue}
                                                    onChange={(e) => setTempValue(e.target.value)}
                                                    onBlur={() => saveEdit(budget.id, "title", tempValue)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") saveEdit(budget.id, "title", tempValue)
                                                        if (e.key === "Escape") cancelEdit()    
                                                    }}
                                                    className="w-full px-3 py-2 font-semibold text-gray-900 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                                    autoFocus
                                                />
                                            ) : (
                                                <div 
                                                    className="w-full px-3 py-2 font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors duration-200 border-2 border-transparent rounded-lg" 
                                                    onClick={()=>startEdit(budget.id, "title", budget.title)}
                                                >
                                                    {budget.title}
                                                </div>
                                            )
                                        }
                                        
                                        {/* Progress bar */}
                                        <div className="mt-2 w-48 bg-gray-200 rounded-full h-2 overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-300 ${
                                                    percentSpent >= 100 ? 'bg-red-500' : 
                                                    percentSpent >= 80 ? 'bg-yellow-500' : 
                                                    'bg-green-500'
                                                }`}
                                                style={{ width: `${Math.min(percentSpent, 100)}%` }}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {
                                            editingCell?.rowId === budget.id && editingCell.field === "amountLimit" ? (
                                                <input 
                                                    type="text"
                                                    value={tempValue}
                                                    onChange={(e) => setTempValue(e.target.value)}
                                                    onBlur={() => saveEdit(budget.id, "amountLimit", tempValue)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") saveEdit(budget.id, "amountLimit", tempValue)
                                                        if (e.key === "Escape") cancelEdit()    
                                                    }}
                                                    className="px-2 py-1 font-medium text-right text-gray-900 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                                    style={{ width: '120px' }}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span 
                                                    className="inline-block px-2 py-1 text-gray-900 font-medium cursor-pointer hover:text-blue-600 transition-colors duration-200 border-2 border-transparent rounded-lg" 
                                                    style={{ width: '120px', textAlign: 'right' }}
                                                    onClick={() => startEdit(budget.id, "amountLimit", budget.amountLimit)}
                                                >
                                                    ${budget.amountLimit}
                                                </span>
                                            )
                                        }
                                        
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {
                                            editingCell?.rowId === budget.id && editingCell.field === "spent" ? (
                                                <input 
                                                    type="text"
                                                    value={tempValue}
                                                    onChange={(e) => setTempValue(e.target.value)}
                                                    onBlur={() => saveEdit(budget.id, "spent", tempValue)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") saveEdit(budget.id, "spent", tempValue)
                                                        if (e.key === "Escape") cancelEdit()    
                                                    }}
                                                    className="px-2 py-1 font-medium text-right text-gray-900 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                                    style={{ width: '120px' }}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span 
                                                    className={`inline-block px-2 py-1 font-medium cursor-pointer hover:text-blue-600 transition-colors duration-200 border-2 border-transparent rounded-lg ${
                                                        percentSpent >= 100 ? 'text-red-600' : 
                                                        percentSpent >= 80 ? 'text-orange-600' : 
                                                        'text-gray-700'
                                                    }`}
                                                    style={{ width: '120px', textAlign: 'right' }}
                                                    onClick={() => startEdit(budget.id, "spent", budget.spent)}
                                                >
                                                    ${budget.spent}
                                                </span>
                                            )
                                        }
                                    
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className={`text-lg font-bold ${
                                                remaining < 0 ? 'text-red-600' : 
                                                remaining < Number(budget.amountLimit) * 0.2 ? 'text-orange-600' : 
                                                'text-green-600'
                                            }`}>
                                                ${remaining.toFixed(2)}
                                            </span>
                                            <span className="text-xs text-gray-500 mt-0.5">
                                                {percentSpent.toFixed(0)}% used
                                            </span>
                                        </div>
                                    </td>
                    </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}