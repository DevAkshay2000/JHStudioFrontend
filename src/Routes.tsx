import { Route, Routes } from "react-router-dom";
import Approutes from "./AppRoutes";
import CustomerComponent from "@/components/customers";
import Dashboard from "@/components/dashboard";
import Products from "@/components/products";
import ServiceSessions from "@/components/service-sessions";
import Services from "@/components/services";
import CustomerHistory from "@/components/customer-history";
// import LoginPage from "./components/Auth/Login";

function AppRouter() {
  return (
    <Routes>
      <Route path={Approutes.DASHBOARD} element={<Dashboard />} />
      {/* <Route path="*" element={<LoginPage />} /> */}

      {/* <Route path={Approutes.LOGIN} element={<LoginPage />} /> */}
      <Route path={Approutes.CUSTOMER} element={<CustomerComponent />} />
      <Route path={Approutes.PRODUCTS} element={<Products />} />
      <Route path={Approutes.SERVICESESSIONS} element={<ServiceSessions />} />
      <Route path={Approutes.SERVICES} element={<Services />} />
      <Route path={Approutes.CUSTOMER_HISTORY} element={<CustomerHistory />} />
    </Routes>
  );
}
export default AppRouter;
