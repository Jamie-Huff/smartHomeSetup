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
  let x = 0
  const [ changeStatement, setChangeStatement ] = useState(false)

  if(naoTalking.heSays.length > 1) {
    setTimeout(() => {  
      setChangeStatement(true)
    }, 5000);
  }
  
  
  return (
    <div className="sidebar__menu">
      <div className="naoCircular__speaking"> 
        <div> 
            {!changeStatement &&
              naoTalking.heSays[0]
            }
            { changeStatement &&
              naoTalking.heSays[x+1]
            }
        </div>                
      </div>
      <img className="sidebar--nao" src={naoTalking.img} alt="Nao Chilling"/>


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



