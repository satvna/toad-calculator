import React, { Component, useState, useEffect } from 'react';
import { useDropzone } from "react-dropzone";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import '../App.css';
import Modal from '@mui/material/Modal';

function Upload({ isUploaded,setUploaded, toad, setToad, setCropModalOpen }) {

  // const [file, setFile] = useState([]);
   const [crop, setCrop] = useState({ aspect: 1 / 1 });


  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setToad([]);
      setToad(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file),
      })));
      setCropModalOpen(true);
      cropper();
    }
  });

  const cropper = () => {

    setUploaded(true);
  }

  const frogPreview = toad.map(file => (
        <img
          src={file.preview}
          alt="frog"
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => toad.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (

    <div className='upload-container'>
      {/* Toad Upload */}
      <div className='drop-box' style={{display: isUploaded ? 'none' : 'block'}}>
        <div {...getRootProps({ className: "dropzone" })}>
          <input className="input-zone" {...getInputProps()} />
          <div className="text-center">
            <p className="dropzone-content">
              Click to select toad for analysis
            </p>
          </div>
        </div>
      </div>

    {/* Toad Display */}
    <div className='drop-box' style={{display: isUploaded ? 'block' : 'none'}}>
        <div {...getRootProps({ className: "dropzone" })}>
          <input className="input-zone" {...getInputProps()} />
            {frogPreview}
        </div>
      </div>


    </div>

  );

}

export default Upload;

