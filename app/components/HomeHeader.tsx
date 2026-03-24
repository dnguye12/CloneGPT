import ThemeToggle from "@/components/ThemeToggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

const HomeHeader = () => {
    return (
        <header className="flex items-center gap-2 px-4 h-16 shrink-0">
            <SidebarTrigger />
            <Separator
                orientation="vertical"
                className="h-4 my-0! self-center!"
            />
            <ThemeToggle />
            <Separator
                orientation="vertical"
                className="h-4 my-0! self-center!"
            />
        </header>
    );
}

export default HomeHeader;