import { Route, Routes } from "react-router-dom";
import Approutes from "./AppRoutes";
import CustomerComponent from "./components/Customers";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import ServiceSessions from "./components/Service-Sessions";
import LoginPage from "./components/Auth/Login";

function AppRouter() {
  return (
    <Routes>
      <Route path={Approutes.DASHBOARD} element={<Dashboard />} />
      {/* <Route path="*" element={<LoginPage />} /> */}

      {/* <Route path={Approutes.LOGIN} element={<LoginPage />} /> */}
      <Route path={Approutes.CUSTOMER} element={<CustomerComponent />} />
      <Route path={Approutes.PRODUCTS} element={<Products />} />
      <Route path={Approutes.SERVICESESSIONS} element={<ServiceSessions />} />
    </Routes>
  );
}
export default AppRouter;
