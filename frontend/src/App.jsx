import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  return (
    <div className="p-10 min-h-screen w-screen pt-3 flex justify-center items-center bg-[#001011]">
      <Router>
        <Routes>
            <Route path="/" element={<Home />}>
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
