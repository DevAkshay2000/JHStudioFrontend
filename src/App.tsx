import "./App.css";
import "./global.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import RoutingFile from "./Routes";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./components/Auth/Login";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <Router>
      <SidebarProvider>
        {localStorage.getItem("a") ? (
          <>
            <AppSidebar />
            <main>
              <SidebarTrigger />
              {children}
            </main>
            <RoutingFile />
          </>
        ) : (
          <LoginPage />
        )}
      </SidebarProvider>
      <Footer />
    </Router>
  );
}
