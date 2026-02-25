import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import BudgetWrapper from "@/components/budget/BudgetWrapper";
import { PieChartDisplay } from "@/components/PieChartDisplay";

export default async function Budget() {
    
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

    const balanceData = await prisma.account.findMany({
        where: {userId: session?.user?.id},
        // orderBy: {id: "asc"}
    })

    const balanceDataToString = balanceData.map(account => ({
        ...account, 
        balance: account.balance.toString(), 
    }))
    
    // calculating the sum of expenses 
    const sumOfExpenses = await prisma.budget.aggregate({
        _sum: {
            // setting the field to true tells prisma to sum this field 
            amountLimit: true
        }, 
        where: {
            userId: session?.user?.id
        }
    })

    const displayToTalBalance = await prisma.account.aggregate({
        _sum: {
            balance: true
        }, 
        where: {
            userId: session?.user?.id
        }
    })

    const netIncome = Number(displayToTalBalance._sum.balance || 0) - Number(sumOfExpenses._sum.amountLimit || 0)
    
    return (
        <main className="">

            <section className="flex gap-6 m-5">
                {/* Total Income Card */}
                <div className="flex-1 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                    <div className="flex flex-col">
                        <p className="text-sm font-medium uppercase tracking-wider text-gray-600">Total Income</p>
                        <p className="text-4xl font-bold mt-2 bg-linear-to-r from-green-500 to-green-600 bg-clip-text text-transparent">${displayToTalBalance._sum.balance?.toString() || "0.00 "}</p>
                    </div>
                </div>

                {/* Total Expenses Card */}
                <div className="flex-1 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                    <div className="flex flex-col">
                        <p className="text-sm font-medium uppercase tracking-wider text-gray-600">Total Expenses</p>
                        <p className="text-4xl font-bold mt-2 bg-linear-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                            ${sumOfExpenses._sum.amountLimit?.toString() || "0.00 "}
                        </p>
                    </div>
                </div>

                {/* Total Net Income Card */}
                <div className="flex-1 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                    <div className="flex flex-col">
                        <p className="text-sm font-medium uppercase tracking-wider text-gray-600">Net Income</p>
                        <p className="text-4xl font-bold mt-2 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">${netIncome}</p>
                    </div>
                </div>
            </section>

            {/* Budget table and chart section */}
            <section className="flex items-start gap-6 m-5">
                <section className="flex flex-col gap-6 w-[60vw]">
                    <BudgetWrapper budgets={serializedBudgets} />
                </section>
                
                <section className="mt-15">
                    <PieChartDisplay />
                </section>
            </section>
        </main>
    )
}