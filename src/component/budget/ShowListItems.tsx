"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react"

export default function ShowListItem({categoryName, subItems} : {categoryName: string; subItems: any[]}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border rounded-lg w-[90vw] p-3">
            {/* Header Row */}
            {/* // Grid: 4 cols -> 1st takes remaining space (1fr), others fit content (auto)
                // gap-6: space between cols | items-center: vertical alignment
                   <div className="grid grid-cols-[1fr_auto_auto_auto] gap-6 items-center"> */}
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-6 items-center">
                <button onClick={() => setIsOpen(!isOpen)} className="flex cursor-pointer">
                    {isOpen ? <ChevronRight /> : <ChevronDown /> }
                    <span>{categoryName}</span>
                </button>
                <div className="text-left min-w-20">Amount</div>
                <div className="text-left min-w-20">Spent</div>
                <div className="text-left min-w-20">Remain</div>
            </div>

            {/* Data Rows */}
            {isOpen || (
                <div>
                    {subItems.map((item, index) => (
                        <div key={index} className="grid grid-cols-[1fr_auto_auto_auto] gap-6 items-center pl-8">
                            <span>{item.itemName}</span>
                            <div className="text-left min-w-20">{item.amount}$</div>
                            <div className="text-left min-w-20">{item.spent}$</div>
                            <div className="text-left min-w-20">{item.amount - item.spent}$</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}