import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Bot from "./Components/Bot";
import Home from "./Components/Home";
function App() {
  return (
    <div className="App h-screen text-white bg-gradient-to-r from-[#0f0c29] via-[#302b63]  to-[#24243e]">
    <h1 className="text-4xl text-center font-bold p-3">Legacy-Lift AI</h1>
    <Router>
    <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route path="/bot" element={<Bot/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
