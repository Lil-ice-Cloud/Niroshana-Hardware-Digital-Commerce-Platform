import Link from "next/link";
import SearchBar from '@/components/ui/Search-Bar/SearchBar';
import {ShoppingCart} from "lucide-react";
import Sidebar from "@/components/ui/SideBar/Sidebar";

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
                    ">
                        <div className="
                        flex
                        items-baseline
                        space-x-8
                        my-10
                        ">
                            {navItem.map((item) => (
                                <Link
                                    key={item.link}
                                    href={item.link}
                                    className=""
                                >
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
                                from-blue-400
                                to-blue-900
                                text-white
                                transition-colors
                                font-medium
                                rounded-full
                                px-6
                                py-3
                                ml-8
                                md:flex
                                my-8
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
                                    my-8
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
                            right-0
                            border-b
                            border-border
                            transition-colors
                            duration-300
                            ">
                        <div>
                            <Sidebar/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
