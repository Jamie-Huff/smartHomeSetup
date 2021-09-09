import React from "react"
import {useState} from "react";

import HouseIcon from '@material-ui/icons/House';
import transitions from "@material-ui/core/styles/transitions";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from '@material-ui/core/styles';
 
import { naoGettingStarted } from "../helpers/naoHelp"

import "./SmartVille.scss";
import "./naoSpeaksSmartville.scss"

//sidebar nao mode
const WELCOME = "WELCOME"
const LOGOUT = "LOGOUT"

//getting started nao

const GETSTARTED = "GETSTARTED"
const GENERAL = "GENERAL"
const MAJOR = "MAJOR"

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: "#CED3DE"
  },

  googleImages: {
    display:"flex", 
    height:"280px", 
    margin:"60px 0px 0px 90px"
  },

  none: {
    display: "none"
  }
}))

export default function SmartVille(props) {
  const classes = useStyles();
  const { transitionNao, modeNao } = props;
 
  const [modeGS, transitionModeGS] = useState(GETSTARTED);

  const naoTalking = naoGettingStarted(modeGS)

  
  if(modeNao === "LOGOUT"){
    transitionNao(LOGOUT)
  } else {
    transitionNao(WELCOME)
  }

  const handleModeGS = (event) => {
    console.log("ABOUTA HANDLE MODE")
    if(modeGS === "GETSTARTED") {
      transitionModeGS (GENERAL);
    }

    if(modeGS === "GENERAL") {
      transitionModeGS (MAJOR);
    }
  }
  
  return (
    <div style={{width:"100%", display:"flex",flexDirection:"column"  }}>
    <div style={{display:"flex",flexDirection:"column"}}>
      <div className="smartVille" style={{width:"100%", display:"flex", marginTop:"60px" }}>
        <img src="images/nao_normal.png" alt="nao" 
        style={{height:"400px", marginLeft: "440px", marginTop:"116px"}}/>
        <div class="box2 sb11">
          <div style={{ display:"flex", flexDirection: "column", justifyContent:"space-between", height: "100%" }}>
            
              <div style={{fontSize:"16px"}}>
                  {naoTalking.heSays[0]}
              </div>
            
            <div style={{ display:"flex", justifyContent:"flex-end" }}>
              <ArrowForwardIcon className={classes.arrow} onClick={handleModeGS}/>
            </div>
          </div>
          <div className= {modeGS === MAJOR ? classes.googleImages : classes.none}>
            <img src="images/googleHomeExample.png" style={{margin:"5px"}}/>
            <img src="images/googleHomeExample2.png"  style={{margin:"5px 5px 23px 5px"}} /></div>
        </div>
      </div>
    </div> 
    <div style={{marginTop:"150px"}}>
        <div style={{display:"flex", height:"200px", width:"880px", justifyContent: "space-between", margin:"100px 120px 0px 150px"}}>
          <img src="images/googleAssistant.png"/> 
          <img  style={{height:"130px", marginTop:"34px", marginLeft:"-48px"}} src="images/appleHomeKit.png"/> 
          <img src="images/alexa.png"/>
        </div>
    </div>
  </div>
  )
}