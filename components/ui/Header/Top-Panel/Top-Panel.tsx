import Link from "next/link";
import SearchBar from '@/components/ui/Header/Search-Bar/SearchBar';
import {ShoppingCart} from "lucide-react";
import Sidebar from "@/components/ui/Header/SideBar/Sidebar";

export const navItem = [
    { name: 'Help', link: '/Help' },
    { name: 'FAQ', link: '/FAQ' },
    { name: 'Blog', link: '/Blog' },
    { name: 'Official Partnerships', link: '/OfficialPartnerships' },
];

export default function TopPanel () {
    return (
        <nav className="
        bg-linear-to-r
      to-gray-400
      from-gray-900
        fixed
        top-16
        left-0
        right-0
        z-40
        bg-background/95
        backdrop-blur-md
        border-b
        border-border
        transition-colors
        duration-300
        text-white
        ">
            <div className="
            max-w-7xl
            mx-auto
            px-4
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
                        font-black
                        font-heading
                        text-primary
                        ">
                            </h1>
                    </div>
                    {/* Desktop Navigation */}
                    <div className="
                    hidden
                    md:flex
                    items-center
                    space-x-6
                    ">
                        <div className="
                        flex
                        items-center
                        space-x-8

                        ">
                            {navItem.map((item) => (
                                <Link
                                    key={item.link}
                                    href={item.link}
                                    className="
                                  hover:bg-red-700
                                    px-3
                                    py-2
                                    cursor-pointer
                                    rounded-lg
                                    font-medium
                                    ">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="
                        ml-8
                        md:flex
                        ">
                            <SearchBar/>
                        </div>
                        <div>
                            <button className="
                                bg-linear-to-r
                                from-red-500
                                to-red-900
                                text-white
                                transition-colors
                                font-medium
                                rounded-full
                                px-6
                                py-2
                                ml-8
                                md:flex

                                ">
                                Search
                            </button>
                        </div>
                        <div className=" ">
                            {/* Shopping Cart*/}
                            {/* eslint-disable-next-line jsx-a11y/aria-props */}
                            <button aria-leble = "Shopping Cart"
                                    className="
                                    relative
                                    p-2
                                    hover:text-foreground
                                    transition-colors
                                  text-white
                                    duration-200

                                    ">
                                <ShoppingCart className="
                                        h-7
                                        w-10"
                                />

                            </button>
                        </div>
                    </div>
                    {/* Sidebar Link to the top-panel */}
                    <div
                        className="
                            fixed
                            top-0
                            left-0
                            border-border
                            transition-colors
                            duration-300
                            pointer-events-none
                            z-50
                            ">
                        <div className="
                        pointer-events-auto
                        ">
                            <Sidebar/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
