import React, { useState } from "react";
import {Link} from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles';

import "../Application.scss";
import "./naoSpeaksApp.scss";

import { naoSidebar } from "../../helpers/naoHelp"

import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  link:{
    color:"white",
    textDecoration: 'none' 
  }
}));

export default function Sidebar(props) {
  const { modeNao } = props
  const classes = useStyles();

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
          <Link to="/" className={classes.link}>
            <div className="sidebar__text">Getting Started</div>
          </Link>   
        </div>
        <div className="sidebar__menuItem">
            <AddToHomeScreenIcon className="sidebar__img" />
            <Link to="/products" className={classes.link}>
              <div className="sidebar__text">Products</div>  
            </Link>   
        </div>
        <div className="sidebar__menuItem">
          <ImportContactsIcon className="sidebar__img" />
          <div className="sidebar__text">Take Survey</div>
        </div>
      </div>     
    </div>        
 );
}



