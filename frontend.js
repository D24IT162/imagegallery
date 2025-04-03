// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Upload from "./Upload";
import Gallery from "./Gallery";

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

// src/Upload.jsx
import { useState } from "react";
import axios from "axios";

function Upload() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image.");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Tags (comma separated)" onChange={(e) => setTags(e.target.value)} />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;

// src/Gallery.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Gallery() {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/images").then((res) => setImages(res.data));
  }, []);

  return (
    <div>
      <h2>Gallery</h2>
      <input type="text" placeholder="Filter by tag" onChange={(e) => setFilter(e.target.value)} />
      <div className="gallery">
        {images
          .filter((img) => !filter || img.tags.join(",").includes(filter))
          .map((img) => (
            <div key={img._id}>
              <h3>{img.title}</h3>
              <img src={img.imageUrl} alt={img.title} width="200" />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Gallery;
