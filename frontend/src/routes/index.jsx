// import { createBrowserRouter, redirect } from "react-router-dom";
// import About from "../pages/About";
// import Home from "../pages/Home";
// import NotFound from "../pages/NotFound";
// import Users from "../pages/Users";
// import Problems from "../pages/Problems";
// import Submissions from "../pages/Submissions";
// import Login from "../pages/Login";
// import Layout from "../components/Layout/Layout";
// import { getAuthToken } from "../utils/auth";

// const tokenLoader = () => {
//   const token = getAuthToken();
//   if (!token || token === "EXPIRED") {
//     return redirect("/login");
//   }
//   return token;
// };

// const router = [
//   {
//     path: "/",
//     element: <Layout />,
//     loader: tokenLoader,
//     errorElement: <NotFound />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "/about",
//         element: <About />,
//       },
//       {
//         path: "/users",
//         element: <Users />,
//       },
//       {
//         path: "/problems",
//         element: <Problems />,
//       },
//       {
//         path: "/submissions",
//         element: <Submissions />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
// ];

// export default function Routes() {
//   return createBrowserRouter(router);
// }

import { createBrowserRouter, redirect } from "react-router-dom";
import About from "../pages/user/About";
import Home from "../pages/user/Home";
import NotFound from "../pages/NotFound";
import Users from "../pages/user/Users";
import Problems from "../pages/user/Problems";
import Submissions from "../pages/user/Submissions";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Layout from "../components/Layout";
import { getAuthToken } from "../utils/auth";
import jwt_decode from "jwt-decode";
import Navbar from "../components/NavbarAdmin";
import { action as logoutAction } from '../components/Logout';
import Exercise from "../pages/user/Exercise/Exercise";

const tokenLoader = () => {
  const token = getAuthToken();
  if (!token || token === "EXPIRED") {
    return redirect("/login");
  }

  // return token;
  const decodedToken = jwt_decode(token);
  return decodedToken;
};

const router = [
  {
    path: "/",
    element: <Layout />,
    loader: tokenLoader,
    // errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        loader: tokenLoader,
        element: <NotFound />,
      },
      {
        path: "student",
        children: [
          {
            index: true,
            loader: tokenLoader,
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
            element: <Exercise />,
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
            loader: tokenLoader,
            element: <NotFound />,
          },
        ],
      },
      {
        path: "teacher",
        children: [
          {
            index: true,
            loader: tokenLoader,
            element: <Home />,
          },
          {
            path: "*",
            loader: tokenLoader,
            element: <NotFound />,
          },
        ],
      },
    ],
  },
  {
    path: "admin",
    element: <Navbar />,
    loader: tokenLoader,
    // errorElement: <NotFound />,
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
        loader: tokenLoader,
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

// import { createBrowserRouter, redirect } from 'react-router-dom';
// import About from "../pages/About";
// import Home from "../pages/Home";
// import NotFound from "../pages/NotFound";
// import Users from "../pages/Users";
// import Problems from "../pages/Problems";
// import Submissions from "../pages/Submissions";
// import Login from "../pages/Login";
// import Layout from '../components/Layout/Layout';
// import { getAuthToken } from '../utils/auth';
// import jwt_decode from "jwt-decode";
// import Hihi from '../pages/Hihi';

// const tokenLoader = () => {
//   const token = getAuthToken();
//   if (!token || token === 'EXPIRED') {
//     return redirect('/login');
//   }

//   const decodedToken = jwt_decode(token);
//   return decodedToken.role;
//   // return token
// };

// const router = [
//     {
//       path: '/student',
//       element: <Layout/>,
//       loader: tokenLoader,
//       errorElement: <NotFound/>,
//       children: [
//         {
//           index: true,
//           element: <Home />,
//         },
//         {
//           path: "users",
//           element: <Users />,
//         },
//         {
//           path: "problems",
//           element: <Problems />,
//         },

//         {
//           path: "about",
//           element: <About />,
//         },
//       ],
//     },
//     {
//       path: 'teacher',
//       element: <Layout/>,
//       loader: tokenLoader,
//       errorElement: <NotFound/>,
//       children: [
//         {
//           index: true,
//           element: <Home />,
//         },
//         {
//           path: "submissions",
//           element: <Submissions />,
//         },
//       ],

//     },
//     {
//       path: '/login',
//       element: <Login />,
//     },

//   ];

//   export default function Routes() {
//     return createBrowserRouter(router);
//   }
