import { useEffect } from "react";
import RootLayout from "../../layout/RootLayout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Root = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/app") navigate("realtime", { replace: true });
  }, []);

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

export default Root;
