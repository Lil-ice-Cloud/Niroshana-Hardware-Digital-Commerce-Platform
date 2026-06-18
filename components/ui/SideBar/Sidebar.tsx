"use client";
import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
            <div>
                <nav className="
                p-5
                flex
                gap-5

                ">
                    {/* Naw bar animation */}
                    <button onClick={toggleNav} className={`
                    space-y-1
                    `}>
                        <span className={`
                        block 
                        h-1 
                        w-6 
                        bg-gray-800 
                        ${isOpen ? 
                            "rotate-45 " +
                            "translate-y-2" : ''
                        }`}></span>

                        <span className={
                            `block 
                            h-1 
                            w-6 
                            bg-gray-800 
                        ${isOpen ? 
                                "opacity-0" : ''
                            }`}></span>

                        <span className={`
                        block 
                        h-1 
                        w-6 
                        bg-gray-800 
                        ${isOpen ? 
                            "-rotate-45 " +
                            "-translate-y-2" : ''
                        }`}></span>
                    </button>
                    {/* Sidebar ham-icon's title */}
                    <div>Logo</div>
                </nav>
                {/* Sidebar content with hover animation */}
                <div className={`
                bg-gray-800 
                text-white 
                h-screen 
                w-48 
                top-0 
                p-5 
                transform
                transition-transform 
                duration-300
                ${isOpen ? 
                    "translate-x-0" : 
                    "-translate-x-full"
                }`}>
                    <ul className="space-y-5">
                        <li className="
                        hover:bg-blue-300
                        p-2
                        rounded-lg
                        ">
                            <a href="#">
                                Home
                            </a>
                        </li>
                        <li className="
                        hover:bg-blue-300
                        p-2
                        rounded-lg
                        ">
                            <a href="#">
                                About
                            </a>
                        </li>
                        <li className="
                        hover:bg-blue-300
                        p-2
                        rounded-lg">
                            <a href="#">Contact</a>
                        </li>
                        <li className="
                        hover:bg-blue-300
                        p-2
                        rounded-lg">
                            <a href="#">
                                Address
                            </a>
                        </li>
                        <li className="
                        hover:bg-blue-300
                        p-2
                        rounded-lg">
                            <a href="#">
                                Email
                            </a>
                        </li>
                        <li className="
                        hover:bg-blue-300
                        p-2
                        rounded-lg">
                            <a href="#">
                                Phone
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
