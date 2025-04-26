import { SidebarHeader } from "./sidebarHeader";
import { SidebarLinks } from "./sidebarLinks";

interface SidebarProps {
    name: string | null
}

export function Sidebar({name}: SidebarProps) {
    return (
        <div className="fixed top-0 left-0 h-screen w-[215px] border-r overflow-y-auto">
            <div className="flex flex-col gap-2 h-full">

                <div className="flex-1 px-3 text-center">

                    <SidebarHeader name={name} />
                    <SidebarLinks />
                </div>
            </div>
        </div>
    )
}