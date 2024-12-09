import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {Dashboard} from './Dashboard';
import { RegisterUser } from './RegisterUser';
import {CreateHomework} from './CreateHomework';
import {ShowHomework} from './ShowHomework'





const router = createBrowserRouter([
  {
    path: "/home",
    element: <Dashboard />,
  }, {

    path: "/",
    element: <App />,
  },
  {
    path: "/RegisterUser",
    element: <RegisterUser/>,
  },
  
  {
    path: "/CreateHomework",
    element: <CreateHomework/>,
  },
  {
    path: "/Dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/ShowHomework",
    element: <ShowHomework/>,
  }
]);


const user = localStorage.user ? JSON.parse(localStorage.user) : undefined;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
      <RouterProvider router={router} />
    </>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
