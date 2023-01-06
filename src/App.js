import React, { useEffect, useState } from "react";
import Upload from "./components/upload";
import Score from "./components/score";
import CropComponent from "./components/crop";
import InfoIcon from '@mui/icons-material/Info';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import './App.css';
import GreenCorner from './assets/green-corner.svg'
import FrogDance from './assets/frog-dance-frog.gif'

//-------- Function for resizing screen for mobile --------
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

//-------- Function for rendering app --------
function App() {

  //props shared with upload and score
  const [toad, setToad] = useState([]);
  const [isUploaded, setUploaded] = useState(false);
  const [isCropped, setIsCropped] = useState(false);
  const [isLoading, setLoading] = useState(""); //flavor text


  //control web and mobile display
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

  const frogDivStyle = width > 1230 ? frogDivStyleWeb : frogDivStyleMobile;

  //control modal
  const [cropModalOpen, setCropModalOpen] = React.useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [infoModalOpen, setInfoModalOpen] = React.useState(false);

  const handleOpen = () => setCropModalOpen(true);
  const handleClose = () => setCropModalOpen(false);

  const infoOpen = () => setInfoModalOpen(true);
  const infoClose = () => setInfoModalOpen(false);

  useEffect(() => { //close crop modal after crop button press
    if (isCropped === true){
      handleClose();
    }
  }, [isCropped]);

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

//-------- BEGIN APP RENDER --------
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
            <InfoIcon  onClick={infoOpen}/>
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
              <CropComponent isCropped={isCropped} setIsCropped={setIsCropped} toad={toad} croppedImage={croppedImage} setCroppedImage={setCroppedImage}/>
            </div>
          </div>
        </Modal>

        {/* Info Modal */}
        <Modal
        open={infoModalOpen}
        onClose={infoClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <div className="info-modal">
            <div className="modal-header-info">
              <h3 className="info-modal-title">deep toad analysis</h3>
              <div className="info-modal-exit" onClick={infoClose}>✖</div>
            </div>
            <div className="info-modal-description">
             <a href="https://at.tumblr.com/koneko-chan/705725889083801600/ophq599gug5s" target="_blank" rel="noreferrer">Based on real science and NOT a tumblr post!!!</a>
             <br></br>
             <p>Toads, objectively, appear to be the sleaziest of god's creatures- but calculating the exact percentage of toad sleaziness has always confounded scientists. People around the world have always wondered, "Just how sleazy is my toad?"</p>
             <p>Wonder no longer! Recent research breakthroughs have allowed us to create an extremely accurate toad sleaziness calculator- simply <span style={{color: '#8ba71f', fontWeight: 'bold'}}>click the green circle</span> and upload the toad you want to investigate.</p>
             <div className="info-modal-footer">
              <img className="dancing-frog" src={FrogDance} alt="dancing frog gif" id="left"></img>
              <span style={{color: '#8ba71f', fontWeight: 'bold'}}>Get calculating!</span>
              <img className="dancing-frog" src={FrogDance} alt="dancing frog gif" id="right"></img>
             </div>

            </div>
          </div>
        </Modal>

        {/* UPLOAD  OR  DISPLAY TOAD */}
        <div className="upload">
          <Upload isLoading={isLoading} setIsCropped={setIsCropped} isCropped={isCropped} croppedImage={croppedImage} isUploaded={isUploaded} setUploaded={setUploaded} toad={toad} setToad={setToad} setCropModalOpen={setCropModalOpen}/>

        </div>

        {/* DISPLAY SLEAZINESS SCORE */}
        <div className="score">
          <Score isLoading={isLoading} setLoading={setLoading} isCropped={isCropped} toad={toad} isUploaded={isUploaded}/>
        </div>
      </div>
    </div>
  );
}

export default App;
