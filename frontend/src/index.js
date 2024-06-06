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
import ForgetPasswordScreen from './screens/forgetPasswordScreen.jsx';
// import Signup from './components/LoginSignup.jsx';
import NotFound from './screens/notfound.jsx';
import Home from './screens/home.jsx';
import Dashboard from './screens/dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
// import LoginScreen from './components/login.jsx';
import LoginSignupScreen from './screens/LoginSignup.jsx';
import ExerciseSelectionPage from './screens/ExerciseSelectionPage.jsx';
import RankScreen from './screens/rankScreen.jsx';
import { ToastContainer} from 'react-toastify';
import toastNotifications from './toastNotification';
import Learning from './screens/learning.jsx';
import Lesson from './screens/lesson.jsx';
import SubLesson from './components/sublesson.jsx';
import Compiler from './components/compiler/compiler.jsx';
import ChallengeDetails from './components/rankComponents/ChallengeDetails.jsx';
import RankResults from './components/rankComponents/rankResults.jsx';
import RankCountdown from './components/rankComponents/RankCountdown.jsx';


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
      <Route path="/forgot-password" element={<ForgetPasswordScreen />} />
      {/* <Route path="/signup" element={<Signup />} /> */}
      <Route path="/Logout" element={<Logout />} />
      <Route path="/exercise" element={<ExerciseSelectionPage />} />
      <Route path="/ranks" element={<RankScreen />} />
      <Route 
        path = "/dashboard"
        element = {
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound/>} />
      <Route path="/learning" element={<Learning />} />
      <Route path="/lesson" element={<Lesson />} />
      <Route path="/sublesson" element={<SubLesson />} />
      
      {/* Add new route below */}
      <Route path="/compiler" element={<Compiler />} />

      <Route path="/challenge-detail/:id" element={<ChallengeDetails />} />
      <Route path="/rank-results/:id" element={<RankResults />} />
      <Route path="/rank-countdown/:id" element={<RankCountdown />} />

      
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <ToastContainer />
      <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
