import { FC, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { data, flowPaths, otkPaths, storePaths } from "../utils/path";

const Login = lazy(() => import("../components/Login"));
const Navbar = lazy(() => import("../components/Navbar"));
const Loading = lazy(() => import("../components/Loading"));
const NotFound = lazy(() => import("../components/404"));

const Root: FC = () => {
  const authUser = useAuthUser();
  const isAuthenticated = useIsAuthenticated();

  const selectedData = () => {
    const flowType = ["1", "2", "3", "4", "5"];
    const authDate = authUser();
    if (authDate?.flowType === "superAdmin") return data;
    else if (flowType.includes(authDate?.flowType)) return flowPaths;
    if (authDate?.flowType === "otk") return otkPaths;
    if (authDate?.flowType === "store") return storePaths;
  };

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth loginPath="/login">
              <Navbar />
            </RequireAuth>
          }
        >
          {selectedData()?.map(({ path, Component, id }) => (
            <Route path={path} key={id} element={<Component />} />
          ))}
        </Route>
        {isAuthenticated() ? (
          <Route path="/login" element={<Navigate to={`/`} />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Root;
