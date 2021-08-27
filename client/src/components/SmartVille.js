import React from "react"
import HouseIcon from '@material-ui/icons/House';

export default function SmartVille(props) {

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:'100%'}}>
      <div style={{display:"flex", alignItems:"flex-start"}}>
        <h1> WELCOME TO SMARTVILL</h1>
        <HouseIcon/>
      </div>
      <img src="images/nao_dab.png" alt="nao"/>
    </div>
  )
}