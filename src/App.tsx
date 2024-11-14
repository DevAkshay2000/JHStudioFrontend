import "./App.css";
import "./global.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import RoutingFile from "./Routes";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <Router>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
        <RoutingFile />
      </SidebarProvider>
      <Footer />
    </Router>
  );
}
