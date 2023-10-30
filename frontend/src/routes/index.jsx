import { createBrowserRouter, redirect } from "react-router-dom";
import About from "../pages/Student/About";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Users from "../pages/Student/Users";
import Problems from "../pages/Student/Problems";
import Submissions from "../pages/Student/Submissions";
import CreateProblem from "../pages/Teacher/CreateProblem";
import Login from "../pages/Authn/Login";
import Signup from "../pages/Authn/Signup";
import Layout from "../components/Layout";
import { getAuthToken, getCurrentUser } from "../utils/auth";
import Navbar from "../components/NavbarAdmin";
import { action as logoutAction } from "../components/Logout";
import ProblemDetail from "../pages/Student/ProblemDetail";
import ProblemsTeacher from "../pages/Teacher/ProblemsTeacher";
import ProblemDetailTeacher from "../pages/Teacher/ProblemsTeacher/ProblemDetailTeacher";

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
            path: "problems/:id",
            loader: tokenLoader,
            element: <ProblemDetailTeacher />,
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
    path: "/logout",
    action: logoutAction,
  },
];

export default function Routes() {
  return createBrowserRouter(router);
}
