import { FC, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import { useIsAuthenticated } from "react-auth-kit";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { data } from "../utils/path";

const Login = lazy(() => import("../components/Login"));

const Root: FC = () => {
  const isAuthenticated = useIsAuthenticated();

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
          {data.map(({ path, Component, id }) => (
            <Route path={path} key={id} element={<Component />} />
          ))}
        </Route>
        {isAuthenticated() ? (
          <Route path="/login" element={<Navigate to={`/`} />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
    </Suspense>
  );
};

export default Root;
