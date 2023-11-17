/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box } from "@mui/material";
import { Carousel } from "../carousel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface ImageData {
  url_path: string;
}

interface ImageUploadButtonProps {
  onUpload: (imageData: string[]) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ onUpload }) => {
  const [selectedImages, setSelectedImages] = React.useState<ImageData[]>([]);

  const initImages = () => [
    {
      url_path: "/images/back_left.png",
    },
    {
      url_path: "/images/back_right.png",
    },
    {
      url_path: "/images/front_left.png",
    },
    {
      url_path: "/images/front_right.png",
    },
    {
      url_path: "/images/side_open.png",
    },
  ];

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (selectedImages.length + files.length <= 5) {
      if (files.length > 0 && files.length <= 5) {
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
          if (selectedImages.length <= 5) {
            setSelectedImages([...selectedImages, ...imageDataArray]);
            //@ts-ignore
            onUpload([...selectedImages, ...imageDataArray]);
          }
        });
      }
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
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            margin={1}
            gap={1}
            width={"100%"}
            position={"relative"}
          >
            {/* <Carousel removeImage={true}  onClickRemove={handleRemoveImage} images={selectedImages} /> */}
            {selectedImages.map((image: any, index: any) => {
              return (
                <Box key={index} width={"30%"} display={"flex"}>
                  <img src={image.url_path} width={"90%"} alt="car-image" />
                  <Box onClick={() => handleRemoveImage(index)} width={"10%"}>
                    <DeleteForeverIcon />
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box width={"100%"}>
            {selectedImages.length !== 5 ? (
              <span className="fs-8px tc-red">
                **กรุณาอัพโหลดรูปให้ครบ 5 รูป
                (หน้าซ้าย,หน้าขวา,หลังซ้าย,หลังขวา,ภายใน)
              </span>
            ) : (
              ""
            )}
          </Box>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </Box>
      ) : (
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          margin={1}
          gap={1}
          width={"100%"}
        >
          {initImages().map((image: any, index: any) => (
            <Box key={index} width={"30%"} display={"flex"}>
              <img src={image.url_path} width={"90%"} alt="car-image" />
            </Box>
          ))}
          <Box width={"100%"}>
            {selectedImages.length !== 5 ? (
              <span className="fs-8px tc-red">
                **กรุณาอัพโหลดรูปให้ครบ 5 รูป
                (หน้าซ้าย,หน้าขวา,หลังซ้าย,หลังขวา,ภายใน)
              </span>
            ) : (
              ""
            )}
          </Box>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default ImageUploadButton;
