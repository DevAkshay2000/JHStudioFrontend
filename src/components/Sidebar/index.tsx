/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
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
// import { MdAdminPanelSettings } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
// import { GrServices } from "react-icons/gr";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronUp, User2 } from "lucide-react";
import AppRoutes from "../../AppRoutes";
import { Link } from "react-router-dom";
import { initStore } from "@/store/init-store";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { FiLogOut } from "react-icons/fi";

// Define the type for the menu items
interface MenuItem {
  title: string;
  url: string;
  icon?: React.ComponentType<{ size?: number }>; // Optional icon type
  subItems: { title: string; url: string }[];
}

// Main menu items with icons
// const mainMenuItems: MenuItem[] = [
//   {
//     title: "Dashboard",
//     url: "#",
//     icon: MdDashboard,
//     subItems: [{ title: "Sale Insights", url: `${AppRoutes.DASHBOARD}` }],
//   },
//   {
//     title: "Admin",
//     url: "#",
//     icon: MdAdminPanelSettings,
//     subItems: [
//       { title: "Customers", url: `${AppRoutes.CUSTOMER}` },
//       { title: "Service Session", url: `${AppRoutes.SERVICESESSIONS}` },
//       { title: "Products", url: `${AppRoutes.PRODUCTS}` },
//     ],
//   },
//   {
//     title: "Services",
//     url: "#",
//     icon: GrServices,
//     subItems: [
//       { title: "Hair Cut", url: "#annual" },
//       { title: "Face Clean Up", url: "#monthly" },
//       { title: "Face Massage", url: "#weekly" },
//     ],
//   },
// ];

export function AppSidebar() {
  const [mainMenuItems, setMainMenuItems] = useState<MenuItem[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initStore());
  }, []);
  const { menuRoutes }: any = useAppSelector((state) => state?.headerMenu);
  const { userData }: any = useAppSelector((state) => state?.userData);
  // Type the state as an array of numbers
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  useEffect(() => {
    setMainMenuItems([
      {
        title: "Dashboard",
        url: "#",
        icon: MdDashboard,
        subItems: [{ title: "Sale Insights", url: `${AppRoutes.DASHBOARD}` }],
      },
      ...menuRoutes,
    ]);
  }, [menuRoutes]);
  // Add type annotation for the index parameter
  const toggleMenu = (index: number): void => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <Sidebar>
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupLabel
            className="text-lg font-bold mb-6 mt-2"
            style={{
              fontFamily: "'Edu AU VIC WA NT Pre', sans-serif",
              color: "var(--color-primary)",
            }}
          >
            JH Hair & Beauty Studio
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((menu, index) => (
                <div key={index} className="group/collapsible">
                  <SidebarMenuItem className="text-slate-950">
                    <SidebarMenuButton onClick={() => toggleMenu(index)}>
                      {menu.icon && <menu.icon size={25} />}
                      <span>{menu.title}</span>
                    </SidebarMenuButton>
                    {openIndexes.includes(index) && (
                      <SidebarMenuSub>
                        {menu.subItems.map((subItem: any, subIndex: any) => (
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
                    <User2 className="text-slate-950" />{" "}
                    <span className="text-slate-950 text-base">
                      {" "}
                      Logged-In -:{" "}
                      <span
                        className="text-bold  text-base"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {userData.userName}
                      </span>
                    </span>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width] text-slate-950"
                >
                  <DropdownMenuItem>
                    <span
                      className="flex items-center justify-end"
                      onClick={handleLogout}
                    >
                      <FiLogOut className="mr-2" />
                      Sign out
                    </span>
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
