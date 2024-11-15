import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronUp, User2 } from "lucide-react";
import AppRoutes from "../../AppRoutes";
import { Link } from "react-router-dom";

// Define the type for the menu items
interface MenuItem {
  title: string;
  url: string;
  icon?: React.ComponentType<{ size?: number }>; // Optional icon type
  subItems: { title: string; url: string }[];
}

// Main menu items with icons
const mainMenuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "#",
    icon: MdDashboard,
    subItems: [
      { title: "Sale Insights", url: `${AppRoutes.DASHBOARD}` },
    ],
  },
  {
    title: "Admin",
    url: "#",
    icon: MdAdminPanelSettings,
    subItems: [
      { title: "Customers", url: `${AppRoutes.CUSTOMER}` },
      { title: "Products", url: `${AppRoutes.PRODUCTS}` },
    ],
  },
  {
    title: "Services",
    url: "#",
    icon: GrServices,
    subItems: [
      { title: "Hair Cut", url: "#annual" },
      { title: "Face Clean Up", url: "#monthly" },
      { title: "Face Massage", url: "#weekly" },
    ],
  },
];

export function AppSidebar() {
  // Type the state as an array of numbers
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  // Add type annotation for the index parameter
  const toggleMenu = (index: number): void => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold mb-2">
            JH Hair & Beauty Studio
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((menu, index) => (
                <div key={index} className="group/collapsible">
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => toggleMenu(index)}>
                      {menu.icon && <menu.icon size={25} />}
                      <span>{menu.title}</span>
                    </SidebarMenuButton>
                    {openIndexes.includes(index) && (
                      <SidebarMenuSub>
                        {menu.subItems.map((subItem, subIndex) => (
                          <SidebarMenuSubItem key={subIndex}>
                            <Link to={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer content */}
        <SidebarFooter className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span className="float-right">Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
