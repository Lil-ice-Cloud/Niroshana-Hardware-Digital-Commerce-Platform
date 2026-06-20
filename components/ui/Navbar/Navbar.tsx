import Link from "next/link";

export const navItem = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
    { name: 'Pricing', link: '/pricing' },
];

export default function Navbar () {
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
                    {/* Loging and Signup */}
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
                </div>
            </div>
        </nav>
    );
}
