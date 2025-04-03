import { useState } from "react";
import axios from "axios";

function Upload() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/images", formData);
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