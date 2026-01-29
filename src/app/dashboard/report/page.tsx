import EditableCategory from "@/component/budget/EditableCategory";

export default function Report() {
    return (
        <main>
            <EditableCategory 
                initialCategoryName="Priority Payments"
                initialSubItems={[
                    { id: 1, itemName: "Tuition fee", amount: 1480, spent: 1380, remaining: 100 },
                    { id: 2, itemName: "Rent", amount: 1200, spent: 1200, remaining: 0 }
                ]}
            />
        </main>
    )
}