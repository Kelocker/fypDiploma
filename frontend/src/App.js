import './App.css';
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";
import ExerciseSelectionPage from './screens/ExerciseSelectionPage';

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
