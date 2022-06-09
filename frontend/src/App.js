import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Display from "./pages/Display";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Display />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
