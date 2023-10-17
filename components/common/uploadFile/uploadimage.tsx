import React from "react";
import { Box } from "@mui/material";

interface ImageData {
  url_path: string;
}

interface ImageUploadButtonProps {
  onUpload: (imageData: string[]) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ onUpload }) => {
  const [selectedImages, setSelectedImages] = React.useState<ImageData[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length > 0) {
      const imagePromises = files.map((file) => {
        return new Promise<ImageData>((resolve) => {
          const reader = new FileReader();

          reader.onload = (e) =>
            resolve({
              //@ts-ignore
              url_path: e.target.result as string,
            });
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then((imageDataArray) => {
        setSelectedImages([...selectedImages, ...imageDataArray]);
        //@ts-ignore
        onUpload([...selectedImages, ...imageDataArray]);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    onUpload(updatedImages.map((image) => image.url_path));
  };

  return (
    <Box>
      {selectedImages.length > 0 ? (
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {selectedImages.map((_, index) => (
            <Box key={index} display={"flex"} margin={1} gap={1}>
              <span>{`car-image ${index + 1}`}</span>
              <button onClick={() => handleRemoveImage(index)}>X</button>
            </Box>
          ))}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </Box>
      ) : (
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      )}
    </Box>
  );
};

export default ImageUploadButton;
