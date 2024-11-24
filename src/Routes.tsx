import { Route, Routes } from "react-router-dom";
import Approutes from "./AppRoutes";
import CustomerComponent from "./components/Customers";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import ServiceSessions from "./components/Service-Sessions";
import Services from "./components/serviceMaster";

function AppRouter() {
  return (
    <Routes>
      <Route path={Approutes.DASHBOARD} element={<Dashboard />} />
      <Route path={Approutes.CUSTOMER} element={<CustomerComponent />} />
      <Route path={Approutes.PRODUCTS} element={<Products />} />
      <Route path={Approutes.SERVICESESSIONS} element={<ServiceSessions />} />
      <Route path={Approutes.SERVICES} element={<Services />} />
    </Routes>
  );
}
export default AppRouter;
