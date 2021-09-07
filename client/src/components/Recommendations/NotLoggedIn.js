import React from "react";
import { makeStyles } from "@material-ui/styles";

import RoomCardList from "./RoomCardList";
import './NotLoggedIn.scss';


export default function NotLoggedIn(props) {
  const { recommendationsAnon } = props;

const handleprint = () => {
  window.print()
}

  return (
    <div>
      <div className="div-container-hidden">
      <button className="printHiddenn" onClick={handleprint}>Print Recommendations</button>
      </div>
      <RoomCardList survey={recommendationsAnon} />
    </div>
  );
}
