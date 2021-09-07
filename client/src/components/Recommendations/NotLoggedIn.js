import React from "react";
import { makeStyles } from '@material-ui/styles';

import RoomCardList from "./RoomCardList";

export default function NotLoggedIn(props) {
  const { recommendationsAnon } = props
  return (
<<<<<<< HEAD
    <React.Fragment>
      {/* <div>Yoooo</div> */}
=======
    <div>
      <button >yoo</button>
>>>>>>> c70f6b5d93ddd2e861b98cb9954b9789ccd8293b
      <RoomCardList survey ={recommendationsAnon}/>
    </div>

  );
}
