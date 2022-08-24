import React from "react";
import AdminLayout from "./layouts/admin/Index";
import AuthLayouts from "./layouts/auth/AuthLayouts";

const App = () => {
  return (
    <div>
      <AuthLayouts/>
      {/* <AdminLayout /> */}
    </div>
  );
};

export default App;
