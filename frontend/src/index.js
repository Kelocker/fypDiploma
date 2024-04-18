import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginScreen from './screens/login.jsx';
import ForgotPassword from './components/forgotPassword.jsx';
import Signup from './screens/signup.jsx';
import Home from './screens/home.jsx';
import Dashboard from './screens/dashboard.jsx';
import Learning from './screens/learning.jsx';
import Lesson from './screens/lesson.jsx';
import Compiler from './components/compiler/compiler.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="/" index={true} element={<Home />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/learning" element={<Learning />} />
      <Route path="/lesson" element={<Lesson />} />
      <Route path="/compiler" element={<Compiler />} />
      {/* Add new route below */}

      
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
