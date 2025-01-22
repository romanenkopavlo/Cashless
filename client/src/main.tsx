import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {Home} from "./pages/Home.tsx";
import {App} from "./App.tsx";
import {UserLogin} from "./pages/User-login.tsx";
import {Profile} from "./pages/Profile.tsx";

const router = createBrowserRouter(([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "/", element: <Home/>},
            {path: "/login", element: <UserLogin/>},
            {path: "/profile", element: <Profile/>}
        ]
    }
]))


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
