import "./App.css";
import React from "react";
import { useState } from "react";
import ImageCropDialog from "./ImageCropDialog";


const initData = [
  {
    id: 1,
    imageUrl: "q1.jpg",
    croppedImageUrl: null,
  },
  // {
  //   id: 2,
  //   imageUrl: "q2.jpg",
  //   croppedImageUrl: null,
  // },
  
];

function App() {
  const [images, setImages] = useState(initData);
  const [selectedImage, setSelectedImage] = useState(null);

  const onCancel = () => {
    setSelectedImage(null);
  };

  const setCroppedImageFor = (id, crop, zoom, aspect, croppedImageUrl) => {
    const newImagesList = [...images];
    const imageIndex = images.findIndex((x) => x.id === id);
    const image = images[imageIndex];
    const newImage = { ...image, croppedImageUrl, crop, zoom, aspect };
    newImagesList[imageIndex] = newImage;
    setImages(newImagesList);
    setSelectedImage(null);
  };

  const resetImage = (id) => {
    setCroppedImageFor(id);
  };

  return (
    <div>
      {selectedImage ? (
        <ImageCropDialog
          id={setSelectedImage.id}
          imageUrl={selectedImage.imageUrl}
          cropInit={selectedImage.crop}
          zoomInit={selectedImage.zoom}
          aspectInit={selectedImage.aspect}
          onCancel={onCancel}
          setCroppedImageFor={setCroppedImageFor}
          resetImage={resetImage}
        />
      ) : null}
      {images.map((image) => (
        <div className="imageCard" key={image.id}>
          <img
            src={image.croppedImageUrl ? image.croppedImageUrl : image.imageUrl}
            onClick={() => {
              console.log(image);
              setSelectedImage(image);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
