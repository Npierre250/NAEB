import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./page/Home";
import Application from "./page/Application";
import Login from "./page/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/application" element={<Application />} />
      <Route path="/login" element={<Login />} />
    </>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
