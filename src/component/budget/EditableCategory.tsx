"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Edit2, Save, X, Plus, Trash2 } from "lucide-react";

interface SubItem {
    id: number;
    itemName: string;
    amount: number;
    spent: number;
    remaining: number;
}

interface EditableCategoryProps {
    initialCategoryName: string;
    initialSubItems: SubItem[];
}

export default function EditableCategory({ initialCategoryName, initialSubItems }: EditableCategoryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [categoryName, setCategoryName] = useState(initialCategoryName);
    const [subItems, setSubItems] = useState<SubItem[]>(initialSubItems);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingCategory, setEditingCategory] = useState(false);

    // State for editing an existing item
    const [editForm, setEditForm] = useState({
        itemName: "",
        amount: 0,
        spent: 0,
        remaining: 0
    });

    // State for adding a new item
    const [newItem, setNewItem] = useState({
        itemName: "",
        amount: 0,
        spent: 0
    });
    const [isAddingNew, setIsAddingNew] = useState(false);

    // Start editing an item
    const startEdit = (item: SubItem) => {
        setEditingId(item.id);
        setEditForm({
            itemName: item.itemName,
            amount: item.amount,
            spent: item.spent,
            remaining: item.remaining
        });
    };

    // Save edited item
    const saveEdit = (id: number) => {
        setSubItems(subItems.map(item => 
            item.id === id 
                ? { 
                    ...item, 
                    ...editForm,
                    remaining: editForm.amount - editForm.spent 
                  }
                : item
        ));
        setEditingId(null);
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({ itemName: "", amount: 0, spent: 0, remaining: 0 });
    };

    // Add new item
    const addNewItem = () => {
        if (newItem.itemName.trim() === "") return;

        const newId = Math.max(...subItems.map(item => item.id), 0) + 1;
        const remaining = newItem.amount - newItem.spent;

        setSubItems([...subItems, {
            id: newId,
            itemName: newItem.itemName,
            amount: newItem.amount,
            spent: newItem.spent,
            remaining: remaining
        }]);

        // Reset form
        setNewItem({ itemName: "", amount: 0, spent: 0 });
        setIsAddingNew(false);
    };

    // Delete item
    const deleteItem = (id: number) => {
        setSubItems(subItems.filter(item => item.id !== id));
    };

    return (
        <div className="border rounded-lg w-[90vw] p-3">
            {/* Header Row */}
            <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-6 items-center">
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>
                    
                    {editingCategory ? (
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                className="border rounded px-2 py-1"
                            />
                            <button onClick={() => setEditingCategory(false)} className="text-green-600">
                                <Save size={18} />
                            </button>
                            <button onClick={() => { setCategoryName(initialCategoryName); setEditingCategory(false); }} className="text-red-600">
                                <X size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <span className="font-semibold">{categoryName}</span>
                            <button onClick={() => setEditingCategory(true)} className="text-gray-500 hover:text-blue-600">
                                <Edit2 size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="text-left min-w-[80px] font-semibold">Amount</div>
                <div className="text-left min-w-[80px] font-semibold">Spent</div>
                <div className="text-left min-w-[80px] font-semibold">Remain</div>
                <div className="min-w-[60px]"></div>
            </div>

            {/* Data Rows */}
            {isOpen && (
                <div className="mt-3">
                    {subItems.map((item) => (
                        <div key={item.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-6 items-center py-2 border-t pl-8">
                            {editingId === item.id ? (
                                // Edit Mode
                                <>
                                    <input
                                        type="text"
                                        value={editForm.itemName}
                                        onChange={(e) => setEditForm({...editForm, itemName: e.target.value})}
                                        className="border rounded px-2 py-1"
                                    />
                                    <input
                                        type="number"
                                        value={editForm.amount}
                                        onChange={(e) => setEditForm({...editForm, amount: Number(e.target.value)})}
                                        className="border rounded px-2 py-1 min-w-[80px]"
                                    />
                                    <input
                                        type="number"
                                        value={editForm.spent}
                                        onChange={(e) => setEditForm({...editForm, spent: Number(e.target.value)})}
                                        className="border rounded px-2 py-1 min-w-[80px]"
                                    />
                                    <div className="min-w-[80px]">{editForm.amount - editForm.spent}</div>
                                    <div className="flex gap-2 min-w-[60px]">
                                        <button onClick={() => saveEdit(item.id)} className="text-green-600">
                                            <Save size={18} />
                                        </button>
                                        <button onClick={cancelEdit} className="text-red-600">
                                            <X size={18} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                // Display Mode
                                <>
                                    <span>{item.itemName}</span>
                                    <div className="min-w-[80px]">${item.amount}</div>
                                    <div className="min-w-[80px]">${item.spent}</div>
                                    <div className="min-w-[80px]">${item.remaining}</div>
                                    <div className="flex gap-2 min-w-[60px]">
                                        <button onClick={() => startEdit(item)} className="text-blue-600 hover:text-blue-800">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => deleteItem(item.id)} className="text-red-600 hover:text-red-800">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}

                    {/* Add New Item Form */}
                    {isAddingNew ? (
                        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-6 items-center py-2 border-t pl-8 bg-blue-50">
                            <input
                                type="text"
                                value={newItem.itemName}
                                onChange={(e) => setNewItem({...newItem, itemName: e.target.value})}
                                placeholder="Item name"
                                className="border rounded px-2 py-1"
                            />
                            <input
                                type="number"
                                value={newItem.amount}
                                onChange={(e) => setNewItem({...newItem, amount: Number(e.target.value)})}
                                placeholder="Amount"
                                className="border rounded px-2 py-1 min-w-[80px]"
                            />
                            <input
                                type="number"
                                value={newItem.spent}
                                onChange={(e) => setNewItem({...newItem, spent: Number(e.target.value)})}
                                placeholder="Spent"
                                className="border rounded px-2 py-1 min-w-[80px]"
                            />
                            <div className="min-w-[80px]">${newItem.amount - newItem.spent}</div>
                            <div className="flex gap-2 min-w-[60px]">
                                <button onClick={addNewItem} className="text-green-600">
                                    <Save size={18} />
                                </button>
                                <button onClick={() => { setIsAddingNew(false); setNewItem({ itemName: "", amount: 0, spent: 0 }); }} className="text-red-600">
                                    <X size={18} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button 
                            onClick={() => setIsAddingNew(true)} 
                            className="flex items-center gap-2 mt-2 ml-8 text-blue-600 hover:text-blue-800"
                        >
                            <Plus size={18} />
                            <span>Add Item</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
