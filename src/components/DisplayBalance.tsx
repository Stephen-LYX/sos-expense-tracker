// "use client"
// // This component will display the Balance amount for users in Home Page
// import { ChevronDown, ChevronRight } from "lucide-react";
// import prisma from "@/lib/prisma";
// import { useState } from "react";

// function DisplayBalance() {
//         // const categories = await prisma.category.findFirst({
//         // select: {
//         //     id:true, 
//         //     categoryName: true,
//         //     parentId: true,
//         // },
        
//     // })
//     const budgetBalance = 110;
//     const value = "0.99";

//     const [isOpen, setIsOpen] = useState(false);
//     const toggleChevron = () => {
//         setIsOpen(!isOpen);
//     }

//     return (
//         <main className="">

//             {/* Box 1 */}
//             <section className="text-4xl border rounded-lg pr-20 pl-20 pt-10 pb-10 ml-5 w-[40vw]">
//                 Current Balance: {budgetBalance}$
//             </section>

//             {/* 
//                 Box 2: 
//                 Users can list categories, assign budget amount, how much was spent and see how much remains
//             */}

//             {/* change the 55vh to h-fit */}
//             <section className="flex m-5 h-[55vh]">
//                 <section className="p-5 border rounded-lg w-[60vw]">
//                     <div className="flex justify-between">
//                         <div className="flex">
//                             <button onClick={toggleChevron} className="cursor-pointer">
//                                 {isOpen ? <ChevronDown/> : <ChevronRight/>}
//                             </button>
//                             <div>
//                                 Category
//                             </div>
//                         </div>

//                         <div className="flex gap-6">
//                             <div>Amount</div>
//                             <div>Spent</div>
//                             <div>Remain</div>
//                         </div>
//                     </div>
//                 </section>

//                 <section className="border rounded-lg w-fit ml-10">
//                     <div className="p-5">
//                         <figure>
                            
//                         </figure>
//                         Graph goes here
//                     </div>
//                 </section>
//             </section>
//         </main>
//     )
// }

// export default DisplayBalance