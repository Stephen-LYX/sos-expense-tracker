"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function updateBalanceAction(customBalance: number, accountId: number) {

    const session = await auth()
    
    if (!session?.user?.id) {
        throw new Error("Not Authenticated")
    }

    await prisma.account.update({
        where: {id: accountId}, 
        data: {balance: customBalance}
    })

    revalidatePath("dashboard/account")
}