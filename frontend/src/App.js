import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Create from './components/Create';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<Create />} />

      </Routes>
      
    </div>
  );
}

export default App;
