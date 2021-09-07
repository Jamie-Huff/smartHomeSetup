import React from "react";
import { makeStyles } from '@material-ui/styles';

import RoomCardList from "./RoomCardList";

export default function NotLoggedIn(props) {
  const { recommendationsAnon } = props
  return (
    <div>
      <button >yoo</button>
      <RoomCardList survey ={recommendationsAnon}/>
    </div>

  );
}
