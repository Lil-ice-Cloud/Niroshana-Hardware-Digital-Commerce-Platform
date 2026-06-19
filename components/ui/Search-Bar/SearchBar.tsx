import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="
        relative
        w-full
        max-w-md
        ">
            {/* Search Icon Container */}
            <div className="
            absolute
            inset-y-0
            left-0 flex
            items-center
            pl-3
            pointer-events-none
            text-muted-foreground
            ">
                <Search className="
                h-5
                w-5"

                />
            </div>

            {/* Input Field */}
            <input
                type="search"
                placeholder="Search here..."
                className="
                w-full
                pl-10
                pr-4
                py-2
                bg-background
                text-foreground
                border
                border-input
                rounded-md my-8
                focus:outline-none
                focus:ring-2
                focus:ring-primary
                focus:border-transparent
                transition-all
                duration-200"
            />
        </div>
    );
}
