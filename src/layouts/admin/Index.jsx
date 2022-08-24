import AdminContextContainer from "../../context/adminLayoutContext";
import Content from "../../pages/Content";
import Navbar from "./Navbar/Index";
import Sidebar from "./sidebar/Index";
import { Navigate } from "react-router-dom";
import { useIsLogin } from "../../hook/authHook";

const Index = () => {
  const [isLogin, loading] = useIsLogin(); //useing from my personal hook
  return (
    <AdminContextContainer>
      {loading ? (
        <h1 className="text-center waiting_center">لطفا صبر کنید</h1>
      ) : isLogin ? (
        <div>
          <Content />
          <Navbar />
          <Sidebar />
        </div>
      ) : (
        <Navigate to={"/auth/login"} />
      )}
    </AdminContextContainer>
  );
};

export default Index;
