import prisma from "@/lib/prisma";
import ShowListItem from "@/components/budget/ShowListItems";
import BudgetList from "@/components/budget/BudgetList";
import { auth } from "@/auth";

export default async function Budget() {
    const currentBalance = 3789.67;
    
    const session = await auth()

    const budgetData = await prisma.budget.findMany({
        where: {userId: session?.user?.id}
    })

    return (
        <main className="">

            {/* Box 1 */}
            <section className="text-4xl border rounded-lg pr-20 pl-20 pt-10 pb-10 ml-5 w-[40vw]">
                Current Balance: {currentBalance}$
            </section>

            {/* 
                Box 2: 
                Users can list categories, assign budget amount, how much was spent and see how much remains
            */}

            {/* change the 55vh to h-fit */}
            <section className="flex m-5 h-[55vh]">
                <section className="flex h-[55vh] w-[60vw] ">
                    {/* <ShowListItem categoryName="Priority Payments" subItems={[
                        {itemName: "Tuition fee", amount: 1480, spent: 1380},
                        { itemName: "Rent", amount: 1200, spent: 1200}
                    ]}
                    /> */}
                    <BudgetList initialData={budgetData}/>
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