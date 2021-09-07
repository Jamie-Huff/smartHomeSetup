import React, { useState } from "react";
import "../Application.scss";
import "./naoSpeaksApp.scss";

import { naoSidebar } from "../../helpers/naoHelp"

import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import CommentIcon from '@material-ui/icons/Comment';
import FlashOnIcon from '@material-ui/icons/FlashOn';


export default function Sidebar(props) {
  const { modeNao } = props

  const naoTalking = naoSidebar(modeNao)
  
  return (
    <div className="sidebar__menu">
      <div className="naoCircular__speaking">               
        <div> 
          {naoTalking}     
        </div>
      </div>
      <img className="sidebar--nao" src="images/nao_peace.png" alt="Nao Chilling"/>


      <div className="sidebar__halfTwo">
        <div className="sidebar__menuItem">
          <FlashOnIcon  className="sidebar__img"/>
          <span  className="sidebar__text">Getting Started</span>
        </div>
        <div className="sidebar__menuItem">
          <AddToHomeScreenIcon className="sidebar__img" />
          <span className="sidebar__text">Products</span>     
        </div>
        <div className="sidebar__menuItem">
          <CommentIcon className="sidebar__img" />
          <span className="sidebar__text">Contact Us</span>
        </div>
      </div>     
    </div>        
 );
}



