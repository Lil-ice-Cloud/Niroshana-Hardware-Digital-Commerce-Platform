"use client";
import { useState } from "react";
import { Settings } from "lucide-react";
import PriceRangeSlider from "@/components/ui/SideBar/PriceRangeSlider";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    }
    // @ts-ignore
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
                    <div>
                        Options
                    </div>
                </nav>
                {/* Sidebar content with hover animation */}
                <div className={`
                bg-linear-to-r
              to-gray-600
              to-gray-600
              from-gray-900
              text-white 
                h-screen 
                w-70
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
                        ">
                            <PriceRangeSlider/>
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
                        {/* Settings icon */}
                        <li className="
                        bg-linear-to-r
                        from-blue-400
                        to-blue-900
                        hover:from-blue-900
                        hover:to-blue-400
                        p-2
                        rounded-lg
                        ">
                            <button className="
                            flex
                            item-center
                            gap-2
                            p-2
                            rounded
                            ">
                                <Settings className="
                                w-10
                                h-auto
                                text-blue-200
                                hover:animate-spin
                                "/>
                                <span className="
                                p-2
                                ">
                                    Settings
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
