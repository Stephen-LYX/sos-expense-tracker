import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config'

// we are creating some seed data to populate the database with sample users and posts, 
// basically fake data for testing purposes 

// adapter is a configured PostgreSQL adapter that knows how to connect to our db. 
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
    // process.env.DATABASE_URL reads an environment variable called database_url. 
    // Env variables are used so we never need to hardcode sensitive info, like db password in our code
})

// this block of code basically tells PrismaClient to use the adapter instance we created in the previous 
// block to talk to the database
const prisma = new PrismaClient ({
    adapter,
})

const userData: Prisma.UserCreateInput[] = [
    {
        email: "stephenlau849@gmail.com",
        username: "stephenlyx",
        name: "Stephen Lau",
        passwordHash: "password1234",
        category: {
            create: [
                {
                    categoryName: "Major Expenses",
                    children: {
                        create: [
                            {categoryName: "Rent", userId: 1},
                            {categoryName: "Tuition Fee", userId:1}
                        ]
                    }
                }
            ]
        }
        

}];

export async function main() {
    for (const u of userData) {
        await prisma.user.create({data: u});
    }
}

main()

