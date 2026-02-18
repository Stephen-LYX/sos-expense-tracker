"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function addBudgetItem(formData: FormData) {
    const session = await auth()
    
    if (!session?.user?.id) {
        throw new Error("Not authenticated")
    }

    const title = formData.get("title") as string
    const amountLimit = formData.get("amountLimit") as string
    const spent = formData.get("spent") as string

    await prisma.budget.create({
        data: {
            userId: session.user.id,
            title: title, 
            amountLimit: parseFloat(amountLimit),
            spent: parseFloat(spent),
        }
    })

    // refresh the page data
    revalidatePath("/dashboard/budget")
}

export async function updateBudgetField(id : number, field: string, value: string) {
    const session = await auth()

    if (!session?.user?.id) {
        throw new Error("Not authenticated")
    }

    await prisma.budget.update({
        where: {id, userId: session.user.id},
        data: {[field]: value}
    })

    revalidatePath("/dashboard/budget")
}

export async function deleteBudgetItem(id: number) {
    const session = await auth()

    if (!session?.user?.id) {
        throw new Error("Not authenticated")
    }

    await prisma.budget.delete({
        where: {id, userId: session.user.id}

    })

    revalidatePath("dashboard/budget")
}