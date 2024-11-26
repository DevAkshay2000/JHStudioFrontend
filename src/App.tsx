import "./App.css";
import "./global.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import RoutingFile from "./Routes";
import Footer from "./components/footer";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./components/auth/login";

export default function App() {
  return (
    <Router>
      {localStorage.getItem("a_token") ? (
        <>
          <SidebarProvider>
            <AppSidebar />
            <main>
              <SidebarTrigger />
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
