import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import HomeSidebarLogo from "./components/HomeSidebarLogo";
import { SearchIcon, SquarePenIcon } from "lucide-react";
import HomeSidebarMenuButtonText from "./components/HomeSidebarMenuButtonText";

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
                <SidebarGroup>
                    <SidebarGroupLabel>Your chats</SidebarGroupLabel>
                    <SidebarGroupContent></SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}

export default HomeSidebar;