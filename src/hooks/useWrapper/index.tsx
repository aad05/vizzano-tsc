import { ConfigProvider } from "antd";
import React, { FC } from "react";
import { AuthProvider } from "react-auth-kit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import store from "../../redux";
import { QueryClient, QueryClientProvider } from "react-query";

import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();

const useWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Provider store={store}>
          <BrowserRouter>
            <ConfigProvider>
              <CookiesProvider>{children}</CookiesProvider>
            </ConfigProvider>
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default useWrapper;
