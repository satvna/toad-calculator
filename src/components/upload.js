import React, { Component, useState, useEffect } from 'react';
import { useDropzone } from "react-dropzone";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import '../App.css';
import Modal from '@mui/material/Modal';

function Upload(props) {

  // const [file, setFile] = useState([]);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });

  const { getRootProps, getInputProps } = useDropzone(
    {
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles  => {
      props.setToad(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file),
      })));  
      props.setCropModalOpen(true);
      props.setUploaded(true);
      props.setIsCropped(false);
    }
  });

  const frogPreview = props.toad.map(file => (
        <img
          src={file.preview}
          alt="frog"
          key= {file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => props.toad.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div className='upload-container'>
      {/* Toad Upload */}
      <div className='drop-box' style={{display: props.isCropped ? 'none' : 'block'}}>
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
    <div className='drop-box' style={{display: props.isCropped ? 'block' : 'none'}}>
        <div {...getRootProps({ className: "dropzone" })}>
          <input className="input-zone" {...getInputProps()} />
          <div className='scanner-animation'></div>
            <img
            src={props.croppedImage}
            alt="frog"
            key= {props.croppedImage}
            // Revoke data uri after image is loaded
            // onLoad={() => { URL.revokeObjectURL(file.preview) }}
          />

        </div>
      </div>


    </div>

  );

}

export default Upload;

