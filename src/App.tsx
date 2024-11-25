import "./App.css";
import "./global.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import RoutingFile from "./Routes";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./components/auth/Login";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <Router>
      {localStorage.getItem("a_token") ? (
        <>
          <SidebarProvider>
            <AppSidebar />
            <main>
              <SidebarTrigger />
              {children}
            </main>
            <RoutingFile />
          </SidebarProvider>
          <Footer />
        </>
      ) : (
        <LoginPage />
      )}
    </Router>
  );
}
