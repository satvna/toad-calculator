import Cropper from 'react-easy-crop'
import React, { useEffect, useState, useCallback } from "react";
import getCroppedImg from './cropImage';
import Button from '@mui/material/Button';

function CropComponent (props){
    const img = props.toad[0].preview;
    // const img = 'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
      }, []);

    const showCroppedImage = useCallback(async () => {
        try {
          const croppedImage = await getCroppedImg(
            img,
            croppedAreaPixels,
            rotation
          )
          console.log('donee', { croppedImage })
          props.setCroppedImage(croppedImage)
          props.setIsCropped(true);
        } catch (e) {
          console.error(e);
        }
    }, [croppedAreaPixels, rotation, img])

    const onClose = useCallback(() => {
        props.setCroppedImage(null)
      }, []);


    return(
        <div className="toad-crop-wrapper">
            <div className="cropper-container">
                <Cropper
                image={img}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={1 / 1}
                cropShape="round"
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
            />
            
        </div>
        <div className="crop-btn">
                <Button
                onClick={showCroppedImage}
                variant="contained"
                color="primary"
                >
                Show Result
                </Button>
            </div>
    </div>
    )
}

export default CropComponent;