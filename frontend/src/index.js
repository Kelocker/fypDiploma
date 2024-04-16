import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import LoginScreen from './screens/login.jsx';
import ForgotPassword from './components/forgotPassword.jsx';
// import Signup from './components/LoginSignup.jsx';
import NotFound from './screens/notfound.jsx';
import Home from './screens/home.jsx';
import Dashboard from './screens/dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
// import LoginScreen from './components/login.jsx';
import LoginSignupScreen from './screens/LoginSignup.jsx';


function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function registerAndLogout() {
  localStorage.clear();
  return <LoginSignupScreen />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="/" index={true} element={<Home />} />
      {/* <Route path="/login" element={<LoginScreen />} /> */}
      <Route path="/login&Signup" element={<LoginSignupScreen />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      {/* <Route path="/signup" element={<Signup />} /> */}
      <Route path="/Logout" element={<Logout />} />
      <Route 
        path = "/dashboard"
        element = {
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound/>} />
      
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
