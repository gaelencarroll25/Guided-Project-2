import './App.css';
import AllCharacters from './AllCharacters';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>SWAPI</h1>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/api/characters" element={<AllCharacters />} />
      </Routes>
      <AllCharacters></AllCharacters>
    </div>
  );
}

export default App;
