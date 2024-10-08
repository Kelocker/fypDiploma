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
import { ToastContainer } from 'react-toastify';
import toastNotifications from './toastNotification';
import Lesson from './components/lesson.jsx';
import SubLesson from './components/sublesson.jsx';
import SubContent from './components/subContent.jsx';
import ExerciseDetail from './components/ExerciseDetail.jsx';
import PasswordResetConfirmScreen from './screens/PasswordResetConfirm.jsx';
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
      <Route path="/reset-password/:uidb64/:token" element={<PasswordResetConfirmScreen />} />
      <Route path="*" element={<NotFound/>} />


      {/* Protected Routes */}

      <Route 
        path = "/dashboard"
        element = {
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
        }
      />

      

      <Route 
        path="/lesson" 
        element={
        <ProtectedRoute>
          <Lesson />
        </ProtectedRoute>
      } 
      />


      <Route 
        path="/sublesson/:chapterId" 
        element={
        <ProtectedRoute>
          <SubLesson />
        </ProtectedRoute>
      } 
      />


      <Route 
        path="/subContent/:subLessonId" 
        element={
        <ProtectedRoute>
          <SubContent />
        </ProtectedRoute>
      } 
      />

      <Route 
        path="/exercise-detail/:id" 
        element={
        <ProtectedRoute>
          <ExerciseDetail />
        </ProtectedRoute>
      } 
      />
      

      <Route 
        path="/challenge-detail/:id" 
        element={
        <ProtectedRoute>
          <ChallengeDetails />
        </ProtectedRoute>
      } 
      />

      <Route 
        path="/rank-results/:id" 
        element={
        <ProtectedRoute>
          <RankResults />
        </ProtectedRoute>
      } 
      />
      
      <Route 
        path="/rank-countdown/:id" 
        element={
        <ProtectedRoute>
          <RankCountdown />
        </ProtectedRoute>
      } 
      />


      
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