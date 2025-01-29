import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {Home} from "./pages/Home.tsx";
import {App} from "./App.tsx";
import {UserLogin} from "./pages/User-login.tsx";
import {Profile} from "./pages/Profile.tsx";
import {Signup} from "./pages/Signup.tsx";
import {PrivateRoute} from "./outils/PrivateRoute.tsx";
import {Logout} from "./pages/Logout.tsx";

const router = createBrowserRouter(([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "/", element: <Home/>},
            {path: "/login", element: <UserLogin/>},
            {path: "/signup", element: <Signup/>},
            {path: "/logout", element: <Logout/>},
            {
                path: "/profile",
                element: <PrivateRoute/>,
                children: [
                    {path: "/profile", element: <Profile/>},
                ]
            }
        ]
    }
]))


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
)