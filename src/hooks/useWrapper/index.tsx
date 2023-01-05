import { ConfigProvider } from "antd";
import React, { FC } from "react";
import { AuthProvider } from "react-auth-kit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import store from "../../redux";

const useWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
    >
      <Provider store={store}>
        <BrowserRouter>
          <ConfigProvider>
            <CookiesProvider>{children}</CookiesProvider>
          </ConfigProvider>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
};

export default useWrapper;
