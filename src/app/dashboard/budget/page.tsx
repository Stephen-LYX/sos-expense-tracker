import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import BudgetClient from "@/components/budget/BudgetClient";
import BudgetWrapper from "@/components/budget/BudgetWrapper";

export default async function Budget() {
    const currentBalance = 3789.67;
    
    const session = await auth()

    const budgetData = await prisma.budget.findMany({
        where: {userId: session?.user?.id},
        orderBy: {id: "asc"}
    })
    
    // Serialize Decimal to string for client component
    const serializedBudgets = budgetData.map(budget => ({
        ...budget,
        amountLimit: budget.amountLimit.toString(),
        spent: budget.spent.toString(),
        startDate: budget.startDate || new Date(),
        endDate: budget.endDate || new Date()
    }))
    
    console.log("session: " , session)
    console.log("user: ", session?.user?.id)
    return (
        <main className="">

            <section className="text-4xl border rounded-lg pr-20 pl-20 pt-10 pb-10 ml-5 w-[40vw]">
                Current Balance: {currentBalance}$
            </section>

            {/* change the 55vh to h-fit */}
            <section className="flex m-5 h-[65vh]">
                <section className="flex flex-col gap-6 h-[65vh] w-[60vw]">
                    <BudgetWrapper budgets={serializedBudgets} />
                </section>
                
                <section className="border rounded-lg w-fit ml-10">
                    <div className="p-5">
                        <figure>
                            
                        </figure>
                        Graph goes here
                    </div>
                </section>
            </section>
        </main>
    )
}