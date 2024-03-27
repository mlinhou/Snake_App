import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Snake from "./Snake";
import Home from './Home';
import './global.css';
import './App.css';

function App() {
  return <div className="App">
    <Router>
      <Routes>
        <Route path="/Snake_App/" element={<Home />} />
        <Route path="/Snake/" element={<Snake />} />
      </Routes>
    </Router>
    </div>;
}

export default App;
