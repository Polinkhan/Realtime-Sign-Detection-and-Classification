// Native modules
import { lazy } from "react";

// Npm modules
import { Navigate, Route, Routes } from "react-router-dom";

// Utils
import { ProtectedRoutes } from "../path/paths";

// React Components
const RootPage = lazy(() => import("../../pages/root"));
const Landing = lazy(() => import("../../pages/root/Landing"));

const RootRouter = () => {
  return (
    <Routes>
      {/*--------------------------------*/}
      {/*      Authenticated Routes      */}
      {/*--------------------------------*/}
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<RootPage />}>
        {ProtectedRoutes.map(({ path, element, children }) => {
          return (
            <Route key={path} path={path} element={element}>
              {children?.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
          );
        })}
      </Route>
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default RootRouter;
