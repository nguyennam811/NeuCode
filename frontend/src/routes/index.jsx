import { createBrowserRouter, redirect } from "react-router-dom";
import About from "../pages/Student/About";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Courses from "../pages/Student/Courses";
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
import StudentList from "../pages/Teacher/CoursesTeacher/StudentList";
import Assignments from "../pages/Student/Courses/Assignments";
import AssignmentDetail from "../pages/Student/Courses/Assignments/AssignmentsDetail";
import SubmissionAssignment from "../pages/Teacher/CoursesTeacher/CourseAssignmentList/SubmissionAssignment";
import CoursesList from "../pages/Admin/CoursesList";
import AssignmentCoursesList from "../pages/Admin/CoursesList/CourseAssignmentList";
import AssignmentStudentList from "../pages/Admin/CoursesList/StudentList";
import SubmissionList from "../pages/Admin/SubmissionList";
import UsersListPage from "../pages/Admin/Users";
import Information from "../pages/Info/Information";
import InforUser from "../pages/Info";
import ChangePassword from "../pages/Info/ChangePassword";
import Dashboard from "../pages/Admin/Dashboard";

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
        path: "user/",
        element: <InforUser />,
        loader: tokenLoader,
        children: [
          {
            index: true,
            path: ":id",
            loader: tokenLoader,
            element: <Information />,
          },
          {
            path: ":id/changepassword",
            element: <ChangePassword />,
          },
        ],
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
            path: "courses",
            element: <Courses />,
          },
          {
            path: "courses/:id/assignments",
            element: <Assignments />,
          },
          {
            path: "courses/assignments/:id",
            loader: tokenLoader,
            element: <AssignmentDetail />,
            // element: <ProblemDetail />,
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
            loader: tokenLoader,
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
            // element: <ProblemDetailTeacher />,
            element: <ProblemDetail />,
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
            element: <StudentList />,
          },
          {
            path: "courses/assignment/:id/submissions",
            // loader: tokenLoader,
            element: <SubmissionAssignment />,
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
        element: <Dashboard />,
      },
      {
        path: "problems",
        loader: tokenLoader,
        element: <ProblemList />,
      },
      {
        path: "problems/:id",
        loader: tokenLoader,
        // element: <ProblemDetailTeacher />,
        element: <ProblemDetail />,
      },
      {
        path: "courses",
        loader: tokenLoader,
        element: <CoursesList />,
      },
      {
        path: "courses/:id",
        loader: tokenLoader,
        element: <AssignmentCoursesList />,
      },
      {
        path: "courses/assignment/:id/submissions",
        // loader: tokenLoader,
        element: <SubmissionAssignment />,
      },
      {
        path: "courses/:id/students",
        loader: tokenLoader,
        element: <AssignmentStudentList />,
      },
      {
        path: "submissions",
        loader: tokenLoader,
        element: <SubmissionList />,
      },
      {
        path: "users",
        loader: tokenLoader,
        element: <UsersListPage />,
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
