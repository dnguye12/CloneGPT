import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import HomeSidebarLogo from "./components/HomeSidebarLogo";
import { SearchIcon, SquarePenIcon } from "lucide-react";
import HomeSidebarMenuButtonText from "./components/HomeSidebarMenuButtonText";
import HomeSidebarChatsList from "./components/HomeSidebarChatsList";

const HomeSidebar = () => {
    

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="flex flex-row items-center justify-between">
                <HomeSidebarLogo />
            </SidebarHeader>
            
            <SidebarContent>
                <SidebarSeparator />
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <SquarePenIcon/> <HomeSidebarMenuButtonText text="New Chat"/>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <SearchIcon /> <HomeSidebarMenuButtonText text="Search Chat"/>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarSeparator />
                <HomeSidebarChatsList />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}

export default HomeSidebar;