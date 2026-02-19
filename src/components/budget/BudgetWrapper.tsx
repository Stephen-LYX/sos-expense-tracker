"use client"

import { useState } from "react"
import DeleteButton from "./DeleteButton"
import BudgetClient from "./BudgetClient"
import NewButton from "./NewButton"

type BudgetItem = {
    id: number 
    title: string
    amountLimit: string
    spent: string 
    startDate: Date
    endDate: Date 
}

type BudgetWrapperProps = {
    budgets: BudgetItem[]
}

export default function BudgetWrapper({budgets}: BudgetWrapperProps) {
    
    const [deleteMode, setDeleteMode] = useState(false)
    

    // set a toggle function 
    const handleToggleDeleteMode = () => {
        setDeleteMode(!deleteMode)
    }

    return (
        <div>
            {/* Buttons in a flex row */}
            <div className="flex items-center gap-4 mb-4">
                <NewButton />
                <DeleteButton deleteMode={deleteMode} onToggle={handleToggleDeleteMode}/>
            </div>

            <BudgetClient budgets = {budgets} deleteMode = {deleteMode} />
        </div>
    )
}