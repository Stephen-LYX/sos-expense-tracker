"use client"

import { Trash2, X } from 'lucide-react'

type DeleteButtonProps = {
    deleteMode: boolean
    onToggle: () => void
}

export default function DeleteButton({deleteMode, onToggle}: DeleteButtonProps) {

    return (
        <div>
            <button
                type="button"
                onClick={onToggle}
                className={`
                    px-6 py-3 rounded-lg font-semibold text-sm
                    flex items-center gap-2
                    transition-all duration-300
                    shadow-lg hover:shadow-xl
                    min-w-40 h-11 cursor-pointer
                    ${deleteMode 
                        ? 'bg-linear-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white' 
                        : 'bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                    }
                `}
            >
                {deleteMode ? (
                    <>
                        <X size={18} />
                        Cancel
                    </>
                ) : (
                    <>
                        <Trash2 size={18} />
                        Delete Items
                    </>
                )}
            </button>
        </div>
    )
}