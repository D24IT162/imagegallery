import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Gallery from "./pages/Gallery";
import Upload from "./pages/Upload";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Image Gallery</h1>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;