// tsconfig.json has path alias set up @/* maps to ./src/*
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  
  const session = await auth()
  if (!session) {
    redirect("/login")
  } else {
    redirect("/dashboard/budget")
  }
  
  return (
    <div></div>
  );
}
