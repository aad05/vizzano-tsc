import { lazy } from "react";
const Home = lazy(() => import("../pages/Home"));
const Flow = lazy(() => import("../components/Flow"));
const FlowSection = lazy(() => import("../components/FlowSection"));
const Report = lazy(() => import("../components/Report"));
const Store = lazy(() => import("../components/Store"));

export const data = [
  {
    id: 0,
    path: "/",
    Component: Home,
  },
  {
    id: 1,
    path: "/flow/:idFlow",
    Component: Flow,
  },
  {
    id: 2,
    path: "/flow/:idFlow/:flowSectionType/:paramsDate",
    Component: FlowSection,
  },
  {
    id: 3,
    path: "/store",
    Component: Store,
  },
  {
    id: 4,
    path: "/report",
    Component: Report,
  },
];
