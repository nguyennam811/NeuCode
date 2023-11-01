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
import ProblemList from "../pages/Admin/ProblemList";
import CoursesTeacher from "../pages/Teacher/CoursesTeacher";
import CourseAssignmentList from "../pages/Teacher/CoursesTeacher/CourseAssignmentList";

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
            loader: tokenLoader,
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
            path: "courses",
            loader: tokenLoader,
            element: <CoursesTeacher />,
          },
          {
            path: "courses/:id",
            loader: tokenLoader,
            element: <CourseAssignmentList />,
          },
          {
            path: "courses/:id/students",
            loader: tokenLoader,
            element: <About />,
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
        path: "problems",
        loader: tokenLoader,
        element: <ProblemList />,
      },
      {
        path: "problems/:id",
        loader: tokenLoader,
        element: <ProblemDetailTeacher />,
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
