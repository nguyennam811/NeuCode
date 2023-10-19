import { createBrowserRouter, redirect } from "react-router-dom";
import About from "../pages/user/About";
import Home from "../pages/user/Home";
import NotFound from "../pages/NotFound";
import Users from "../pages/user/Users";
import Problems from "../pages/user/Problems";
import Submissions from "../pages/user/Submissions";
import CreateProblem from "../pages/user/CreateProblem";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Layout from "../components/Layout";
import { getAuthToken, getCurrentUser } from "../utils/auth";
import Navbar from "../components/NavbarAdmin";
import { action as logoutAction } from '../components/Logout';
import ProblemDetail from "../pages/user/ProblemDetail";
import ProblemsTeacher from "../pages/user/ProblemsTeacher";

const tokenLoader = () => {
  const token = getAuthToken();
  const current_user = getCurrentUser();
  if (!token || token === "EXPIRED" || !current_user) {
    return redirect("/login");
  }

  return current_user;
  
};

const router = [
  {
    path: "/",
    element: <Layout />,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "student",
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "problems",
            element: <Problems />,
          },
          {
            path: "problems/:id",
            loader: tokenLoader,
            element: <ProblemDetail />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "submissions",
            element: <Submissions />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
      {
        path: "teacher",
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "problems",
            element: <ProblemsTeacher />,
          },
          {
            path: "create_problem",
            element: <CreateProblem />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
  {
    path: "admin",
    loader: tokenLoader,
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Problems />,
      },
      {
        path: "user",
        element: <About />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: '/logout',
    action: logoutAction,
  },
];

export default function Routes() {
  return createBrowserRouter(router);
}
