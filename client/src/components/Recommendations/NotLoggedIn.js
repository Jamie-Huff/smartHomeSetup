import React, { useState } from "react";
import { makeStyles } from '@material-ui/styles';

import RoomCardList from "./RoomCardList";

export default function NotLoggedIn(props) {
  const { recommendationsAnon } = props 

  return (
    <React.Fragment>
      {/* <div>Yoooo</div> */}
      <RoomCardList survey ={recommendationsAnon}/>
    </React.Fragment>
    
  );
}
