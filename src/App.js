import './Assets/App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route 
          path='/' 
          element={ <Home /> } 
        />
        <Route 
          path='*' 
          element={<div>you 404'd boss</div>} 
        />
      </Routes>
    </div>
  );
}

export default App;
