function ImageCard({ image }) {
  return (
    <div>
      <h3>{image.title}</h3>
      <img src={image.imageUrl} alt={image.title} width="200" />
      <p>Tags: {image.tags.join(", ")}</p>
    </div>
  );
}
export default ImageCard;