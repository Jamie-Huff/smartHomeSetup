import React from "react"
import HouseIcon from '@material-ui/icons/House';
import transitions from "@material-ui/core/styles/transitions";

import "./SmartVille.scss";

const WELCOME = "WELCOME"
const LOGOUT = "LOGOUT"

export default function SmartVille(props) {
  const { transitionNao, modeNao } = props;
  console.log("MODE IS", modeNao)
  if(modeNao === "LOGOUT"){
    transitionNao(LOGOUT)
  } else {
    transitionNao(WELCOME)
  }
  
  return (
    <div className="smartVille__top">
      <div className="smartVille__top smartVille__top-gettingStarted">
        <h1> WELCOME TO SMARTVILL</h1>
        <HouseIcon/>
      </div>
      <img src="images/nao_dab.png" alt="nao"/>
    </div>
  )
}