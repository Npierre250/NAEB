import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./page/Home";
import Application from "./page/Application";
import Login from "./page/Login";
import Signup from "./page/Signup";
import NotFound from "./page/NotFound";
import DashboardLayout from "./components/section/form/layout/DashboardLayout";
import DashboardHome from "./page/dashboard/DashboardHome";
import Schedule from "./page/dashboard/Schedule";
import DashboardUserHome from "./page/dashboard/DashboardUserHome";
import Profile from "./page/dashboard/Profile";
import Calling from "./page/dashboard/Calling";
import { Toaster } from "react-hot-toast";
import Subscription from "./page/dashboard/Subscription";
import getUserInfo from "./utils/getUserInfo";
import OperationReport from "./page/dashboard/OperationReport";

function App() {
  const user:any=getUserInfo();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/application" element={<Application />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route
            index
            element={
              user?.data.email !== "calvinusbukaran@gmail.com" ? (
                <DashboardUserHome />
              ) : (
                <DashboardHome />
              )
            }
          />
          <Route path="schedule" element={<Schedule />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reports" element={<OperationReport/>}/>
          <Route path="calling" element={<Calling />} />
          <Route path="subscription" element={<Subscription />} />
          {/* <Route path="deliveries" element={<DashboardUserHome />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </>
    )
  );
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
