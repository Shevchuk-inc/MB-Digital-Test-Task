import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import { Auth } from "../../features/auth";

import Home from "../../pages/Home/Home";
import { PrivateRoute } from "./PrivateRoute.tsx";
import ROUTES from "./routes.ts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={ROUTES.auth} element={<Auth />} />
      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.home} element={<Home />} />
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Route>,
  ),
);

export default router;
