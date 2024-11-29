import { lazy, ReactNode } from "react";
import Suspense from "../../components/handler/Suspense";

interface RoutesTypes {
  path: string;
  name?: string;
  element: ReactNode;
  privilegeModule?: string;
  children?: RoutesTypes[];
}

// -------------------------------------
// Import ProtectedRoutes with lazy load
// -------------------------------------
const Video = lazy(() => import("../../pages/video"));
const Image = lazy(() => import("../../pages/image"));
const Realtime = lazy(() => import("../../pages/Realtime"));
const StartRealTime = lazy(() => import("../../pages/Realtime/StartRealTime"));

// ----------------------------------------------
// All Protected Paths with compoent defined here
// ----------------------------------------------
const ProtectedRoutes: Array<RoutesTypes> = [
  {
    element: (
      <Suspense>
        <Realtime />
      </Suspense>
    ),
    path: "realtime",
  },
  {
    element: (
      <Suspense>
        <StartRealTime />
      </Suspense>
    ),
    path: "realtime_start",
  },
  {
    element: (
      <Suspense>
        <Image />
      </Suspense>
    ),
    path: "image",
  },
  {
    element: (
      <Suspense>
        <Video />
      </Suspense>
    ),
    path: "video",
  },
];

export { ProtectedRoutes };
