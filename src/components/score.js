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

  const loadingFunction = () =>{
    if (props.isCropped == true){
      props.setLoading(true);
      setTimeout(() => {
        console.log("Delaying for 3 seconds");
        props.setLoading(false);
      }, "3000")
    }
  }

  //calculate sleaze on toad change
  useEffect(()=>{
    calculateSleaze();
    loadingFunction();
  }, [props.isCropped]);

  //set flavor text after sleaze is calculate
  useEffect(()=>{
    setFlavor(flavorText());
  }, [sleaze]);

    return(
      <div>
        <div  style={{display: ((props.isCropped == true) && (props.isLoading == false)) ? 'block' : 'none'}}>
          <h2 className='fade-in-text'>Power Level:</h2>
          <h2 className='fade-in-text'>{sleaze}%</h2>
          <p className='fade-in-subtext'>{flavor}</p>
        </div>
        <div style={{display: props.isLoading ? 'block' : 'none'}}>
          <h2>Loading...</h2>
        </div>
        <div style={{display: ((props.isCropped == false) && (props.isLoading == false))  ? 'block' : 'none'}}>
          <h3>Upload a toad to determine its power level</h3>
        </div>
      </div>
    )


}

export default Score;
