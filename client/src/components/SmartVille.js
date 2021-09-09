import React from "react"
import {useState} from "react";

import HouseIcon from '@material-ui/icons/House';
import transitions from "@material-ui/core/styles/transitions";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from '@material-ui/core/styles';


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
  }
}))

export default function SmartVille(props) {
  const classes = useStyles();
  const { transitionNao, modeNao } = props;
 
  const [modeGS, transitionModeGS] = useState(GETSTARTED);

  
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
    // <div style={{width:"100%", display:"flex" }}>
      <div className="smartVille" style={{width:"100%", display:"flex", marginTop:"60px" }}>
        <img src="images/nao_normal.png" alt="nao" 
        style={{height:"400px", marginLeft: "440px", marginTop:"116px"}}/>
        <div class="box2 sb11">
          <div style={{ display:"flex", flexDirection: "column", justifyContent:"space-between", height: "100%" }}>
            
              <div style={{fontSize:"16px"}}>
                { modeGS === GETSTARTED &&
                  " GET STARTED"
                }

                { modeGS === GENERAL &&
                  "GENERAL"
                }   

                { modeGS === MAJOR &&
                  "MAJOR"
                }    
              </div>
            
            <div style={{ display:"flex", justifyContent:"flex-end" }}>
              <ArrowForwardIcon className={classes.arrow} onClick={handleModeGS}/>
            </div>
          </div>
      </div>
     </div>
    
  )
}