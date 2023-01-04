import React, { Component, useEffect, useState} from 'react';


function Score (props){

  const [sleaze, setSleaze] = useState(-1); //sleaze %
  const [flavor, setFlavor] = useState(""); //flavor text

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

  //determine flavor text
  const flavorText = () =>{
    switch(sleaze){
      case (sleaze < 95):
        return "This isn't just a polite toad. It is a holy toad.";
        break;
      case 95:
        return "There is only a 2% chance of finding a toad this polite in the wild. Congratulations!";
        break;
      case 96:
        return "He looks very polite.";
        break;
      case 97:
        return "Don't let the high number fool you- this is a remarkably polite toad.";
        break;
      case 98:
          return "Get a load of that toad!";
          break;
      case 99:
        return "This toad is average in its sleaziness.";
        break;
      default:
        return "Wow 😳 What a toad!";
    }
    return this.flavor;
  }

  //calculate sleaze on toad change
  useEffect(()=>{
    calculateSleaze();
    setFlavor(flavorText());    
  }, [props.toad]);

  //set flavor text after sleaze is calculate
  useEffect(()=>{
    setFlavor(flavorText());    
  }, [sleaze]);

    return(
      <div>
        <div style={{display: props.isUploaded ? 'block' : 'none'}}>
          <h2>Sleaze Score:</h2>
          <h2>{sleaze}%</h2>
          <p>{flavor}</p>
        </div>
        <div style={{display: props.isUploaded ? 'none' : 'block'}}>
          <h3>Upload a toad to determine its level of sleaziness.</h3>
        </div>
      </div>
    )


}

export default Score;
