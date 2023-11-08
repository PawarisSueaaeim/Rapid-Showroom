import React from "react";
import { Box } from "@mui/material";
import { Carousel } from "../carousel";

interface ImageData {
  url_path: string;
}

interface ImageUploadButtonProps {
  onUpload: (imageData: string[]) => void;
  maxSize?: (value: boolean) => void;
}

const MAX_SIZE_BYTES = 10 * 1024**2;

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ onUpload , maxSize}) => {
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
        if(selectedImages.length <= 4){
          setSelectedImages([...selectedImages, ...imageDataArray]);
          //@ts-ignore
          onUpload([...selectedImages, ...imageDataArray]);
        }
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
          <Box display={"flex"} margin={1} gap={1} width={300} position={"relative"}>
            <Carousel removeImage={true}  onClickRemove={handleRemoveImage} images={selectedImages} />
          </Box>
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
