import './App.css';
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
