import React, { Component, useEffect, useState} from 'react';


function Score ({isUploaded}){

  const [sleaze, setSleaze] = useState(-1);

  const calculateSleaze = () =>{
    let myNum = Math.random();

    //0.5% chance of getting a number less than 95
    if (myNum < .005){
      setSleaze(Math.floor(Math.random() * 95))
    }
    //2.5% chance of getting 95
    else if (myNum < .030){
      setSleaze(95);
    }
    //3% chance of getting 96
    else if (myNum < .06){
      setSleaze(96);
    }
    //4% chance of getting 97
    else if (myNum < .10){
      setSleaze(97);
    }
    //25% chance of getting 98
    else if (myNum < .35){
      setSleaze(98);
    }
    //25% chance of getting 99
    else if (myNum < .60){
      setSleaze(99);
    }
    //30% chance of getting 100
    else if (myNum < 1){
      setSleaze(100);
    }
  }

  const frogUploaded = () =>{
    if (isUploaded === true){
      calculateSleaze();
    }
  }

  useEffect(()=>{
    frogUploaded();
  }, [isUploaded]);


    return(
      <div>
        <div style={{display: isUploaded ? 'block' : 'none'}}>
          <h2>Sleaze Score:</h2>
          <h2>{sleaze}</h2>
        </div>
        <div style={{display: isUploaded ? 'none' : 'block'}}>
          <h3>Upload a toad to determine its sleaziness.</h3>
        </div>
      </div>
    )


}

export default Score;
