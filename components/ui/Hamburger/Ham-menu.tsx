import Sidebar from "@/components/ui/SideBar/Sidebar";


export default function HamMenu () {
    return (
        <nav className="
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

        </nav>
    );
}
