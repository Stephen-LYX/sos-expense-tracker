"use client"
import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

function Chevron() {
    const [isOpen, setIsOpen] = useState(false);

    const setToggle = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div>
            <button onClick={setToggle} className="cursor-pointer">
                {isOpen ? <ChevronRight/> : <ChevronDown/>}
            </button>
        </div>
    )
}

export default Chevron