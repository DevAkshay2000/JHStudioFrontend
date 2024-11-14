import { Route, Routes } from "react-router-dom";
import Approutes from "./AppRoutes";
import CustomerComponent from "./components/Customers";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";

function AppRouter() {
  return (
    <Routes>
      <Route path={Approutes.DASHBOARD} element={<Dashboard />} />
      <Route path={Approutes.CUSTOMER} element={<CustomerComponent />} />
      <Route path={Approutes.PRODUCTS} element={<Products />} />
    </Routes>
  );
}
export default AppRouter;
