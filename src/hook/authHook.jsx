import { useEffect, useState } from "react";
import axios from "axios";

export const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loginToken = JSON.parse(localStorage.getItem("loginToken"));
    if (loginToken) {
      axios
        .get("https://ecomadminapi.azhadev.ir/api/auth/user", {
          headers: {
            Authorization: `Bearer  ${loginToken.token}`,
          },
        })
        .then((res) => {
          setIsLogin(res.status === 200 ? true : false);
          setLoading(false);
        })
        .catch((e) => {
          localStorage.removeItem("loginToken");
          setIsLogin(false);
          setLoading(false);
        });
    } else {
      setIsLogin(false);
      setLoading(false);
    }
  }, []);
  return [isLogin, loading];
};
