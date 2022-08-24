import React from "react";
import { useLocation } from "react-router-dom";
import AdminLayout from "./layouts/admin/Index";
import AuthLayouts from "./layouts/auth/AuthLayouts";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname.includes("/auth") ? <AuthLayouts /> : <AdminLayout />}
    </div>
  );
}

export default App;
