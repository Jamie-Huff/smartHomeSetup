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
    <div className="smartVille__top" style={{width:"100%"}}>
      <div className="smartVille__top smartVille__top-gettingStarted">
      </div>
      <img src="images/nao_normal.png" alt="nao" style={{height:"400px", marginLeft: "524px", marginTop:"80px"}}/>
    </div>
  )
}