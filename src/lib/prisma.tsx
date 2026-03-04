import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";


//1. Create a connection pool using your DB URL (a pool is like a cache of db connections)
const pool = new Pool({ connectionString: process.env.DATABASE_URL});

//2. Create the adapter 
const adapter = new PrismaPg(pool);

//3. Pass the adapter to the PrismaClient constructor
const prisma = new PrismaClient({adapter});

export default prisma
