import React, { useState, useRef, useEffect } from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";

import { Dialog, DialogContent, Button, Box } from "@material-ui/core";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function CropImage({ selectedFile, setCropData, aspectRatio }) {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(aspectRatio);
  const [isOpen, setIsOpen] = useState(false);

  function onSelectFile(file) {
    if (file) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result.toString() || "")
      );
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    if (selectedFile) {
      onSelectFile(selectedFile);
      setIsOpen(true);
    }
  }, [selectedFile]);

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(150, 150, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  const saveHandler = () => {
    var canvas = document.getElementById("alpha");
    var dataURL = canvas.toDataURL("image/png");
    console.log("dataURL", dataURL);
    setCropData(dataURL);
    setIsOpen(false);
  };

  return (
    <div className='App'>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth='sm'
        fullWidth
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogContent>
          {/* <div className='Crop-Controls'>
            <input type='file' accept='image/*' onChange={onSelectFile} />
          </div> */}

          {Boolean(imgSrc) && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
            >
              <img
                ref={imgRef}
                alt='Crop me'
                src={imgSrc}
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
          <div>
            {Boolean(completedCrop) && (
              <canvas
                id='alpha'
                ref={previewCanvasRef}
                style={{
                  border: "1px solid black",
                  objectFit: "contain",
                  width: completedCrop.width,
                  height: completedCrop.height,
                }}
              />
            )}
          </div>
          <Box mt={3}>
            <Button onClick={saveHandler}>Save</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
