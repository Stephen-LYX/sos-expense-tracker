"use server"
import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import BalanceCard from "@/components/BalanceCard"

async function Account() {
    
    const session = await auth()
    const account = await prisma.account.findFirst({where: {userId: session?.user?.id}})

    return (
        <div className="m-5">
            {/* in order to know the account.id, we need to pass it to the update function */}
            <BalanceCard accountId={account?.id} displayBalance={account?.balance?.toFixed(2) ?? "$0.00"}/>
        </div>
    )
}

export default Account