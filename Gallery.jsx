import { useEffect, useState } from "react";
import axios from "axios";
import ImageCard from "../components/ImageCard";

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
          .filter((img) => !filter || img.tags.includes(filter))
          .map((img) => (
            <ImageCard key={img._id} image={img} />
          ))}
      </div>
    </div>
  );
}

export default Gallery;
