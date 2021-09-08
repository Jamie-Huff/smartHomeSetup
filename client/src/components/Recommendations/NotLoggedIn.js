import React from "react";
import { makeStyles } from '@material-ui/styles';

import RoomCardList from "./RoomCardList";

export default function NotLoggedIn(props) {
  const { recommendationsAnon, transitionNao } = props
  return (
    <div>
      <button >yoo</button>
      <RoomCardList survey ={recommendationsAnon} transitionNao={transitionNao}/>
    </div>

  );
}
