"use client";

import {useState} from "react";
import Link from "next/link";

export const navItem = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
    { name: 'Pricing', link: '/pricing' },
];

export default function Navbar () {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="
        fixed
        top-0
        left-0
        right-0
        z-50
        bg-linear-to-r
        to-gray-400
        from-gray-900
        backdrop-blur-md
        border-b
        border-border
        transition-colors
        duration-300
        ">
            <div className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            ">
                <div className="
                flex
                justify-between
                items-center
                h-16
                ">
                    <div >
                        <h1 className="
                        text-2xl
                        text-white
                        font-black
                        font-heading
                        ">
                            Niroshana Hardware.LK
                        </h1>
                    </div>
                    {/* Desktop Navigation */}
                    <div className="
                    hidden
                    md:flex
                    items-baseline
                    space-x-8
                    ">
                        <div className="
                        flex
                        items-baseline
                        space-x-8
                        ">
                            {navItem.map((item) => (
                                <Link
                                    key={item.link}
                                    href={item.link}
                                    className="
                                    hover:bg-red-700
                                    p-1
                                    rounded-lg
                                    text-white
                                    font-medium
                                    ">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* Logging and Signup */}
                    <div className="
                        hidden
                        md:flex
                        items-baseline
                        space-x-2
                    ">
                        <button className="
                        bg-linear-to-r
                        from-red-500
                        to-red-900
                        hover:from-red-900
                        hover:to-red-500
                        text-white
                        transition-colors
                        font-medium
                        rounded-full
                        px-6
                        py-3
                        cursor-pointer
                        ">
                            Sign in
                        </button>
                        <button className="
                        bg-linear-to-r
                        from-red-500
                        to-red-900
                        hover:from-red-900
                        hover:to-red-500
                        text-white
                        transition-colors
                        font-medium
                        rounded-full
                        px-6
                        py-3
                        cursor-pointer
                        ">
                            Sign up
                        </button>
                    </div>
                    {/* Mobile Hamburger */}
                    <div className="
                    flex
                    md:hidden
                    ">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="
                            text-white
                            hover:text-gray-300
                            focus:outline-none
                            "
                        aria-label="toggle menu"
                        >
                            <svg className="
                            h-6
                            w-6"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                ):(
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                                )}
                            </svg>
                        </button>
                </div>
            </div>
        </div>
            {/* Mobile Menu Panel */}
            {isOpen && (
                <div className="
                md:hidden
                bg-gray-900
                border-b
                border-border
                px-4
                pt-2
                pb-4
                space-y-3
                ">
                    {navItem.map((item) => (
                        <Link
                        key={item.link}
                        href={item.link}
                        onClick={() => setIsOpen(false)}
                        className="
                        block
                        hover:bg-red-700
                        p-2
                        rounded-lg
                        text-white
                        font-medium
                        "
                        >
                            {item.name}
                       </Link>
                    ))}
                    <div className="
                    pt-4
                    border-t
                    border-red-700
                    flex
                    flex-col
                    space-y-2
                    ">
                        <button className="
                            w-full
                            bg-linear-to-r
                            from-white
                            to-gray-800
                            text-white
                            font-medium
                            rounded-full
                            py-2
                            cursor-pointer
                            ">
                            Search
                        </button>
                    </div>
                    <div className="
                    pt-4
                    border-t
                    border-gray-700
                    flex
                    flex-col
                    space-y-2
                    ">
                        <button className="
                        w-full
                        bg-linear-to-r
                        from-red-500
                        to-red-900
                        text-white
                        font-medium
                        rounded-full
                        py-2
                        cursor-pointer
                        ">
                            Sign in
                        </button>
                        <button className="
                        w-full
                        bg-linear-to-r
                        from-red-500
                        to-red-900
                        text-white
                        font-medium
                        rounded-full
                        py-2
                        cursor-pointer
                        ">
                            Sign Up
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
