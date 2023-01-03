import React, { useEffect, useState } from "react";
import Upload from "./components/upload";
import Score from "./components/score";
import InfoIcon from '@mui/icons-material/Info';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ImageCropper from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'

import './App.css';
import GreenCorner from './assets/green-corner.svg'

function getWindowDimensions(){
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

 function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

function App() {
  const [toad, setToad] = useState([]);
  const [croppedToad, setCroppedToad] = useState([]);
  const [cropModalOpen, setCropModalOpen] = React.useState(false);

  const [crop, setCrop] = useState({aspect:1/1});
  const [isUploaded, setUploaded] = useState(false);

  const handleOpen = () => setCropModalOpen(true);
  const handleClose = () => setCropModalOpen(false);

  const { height, width } = useWindowDimensions();



  const containerDivStyle = {
    height: height,
    width: width
  };
  const frogDivStyleWeb = {
    height: height,
  };
  const frogDivStyleMobile = {
    height: height,
    width: width
  };

  //Set width for mobile vs. web container
  const frogDivStyle = width > 912 ? frogDivStyleWeb : frogDivStyleMobile;

  //Modal Styling
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #C9E265',
    boxShadow: 24,
    p: 4,
  };

  //Crop functionality
  const cropImageNow = () => {
    const canvas = document.createElement('canvas');
    const scaleX = toad.naturalWidth / toad.width;
    const scaleY = toad.naturalHeight / toad.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
    toad,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
    );

    // Converting to base64
    const base64Image = canvas.toDataURL('image/jpeg');
    setCroppedToad(base64Image);
};

  return (
    <div className="site-container">

      <div className="frog-container" style={frogDivStyle}>
        {/* GREEN CORNER BLOB THINGS */}
        <div className="accent-top">
          <img src={GreenCorner}></img>
        </div>
        <div className="accent-bottom">
          <img src={GreenCorner}></img>
        </div>

        {/* HEADER */}
        <div className="header">
          <div className="info-button">
            <InfoIcon/>
          </div>
        </div>

       {/* TITLE */}
        <div className="title">
          <h1>Toad Sleaziness Calculator</h1>
        </div>

        {/* Crop Modal */}
        <Modal
        open={cropModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <div className="modal">
            <div className="modal-header">
              <h3>crop your toad</h3>
            </div>
            <div className="crop-zone">
              <ImageCropper
                imageToCrop={toad.preview}
                onImageCropped={(croppedToad) => setCroppedToad(croppedToad)}
              />
            </div>
          </div>
        </Modal>

        {/* UPLOAD  OR  DISPLAY TOAD */}
        <div className="upload">
          <Upload isUploaded={isUploaded} setUploaded={setUploaded} toad={toad} setToad={setToad} setCropModalOpen={setCropModalOpen}/>
        </div>

        {/* DISPLAY SLEAZINESS SCORE */}
        <div className="score">
          <Score isUploaded={isUploaded}/>
        </div>
      </div>
    </div>
  );
}

export default App;
