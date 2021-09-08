import React from "react";
import { makeStyles } from "@material-ui/styles";

import RoomCardList from "./RoomCardList";
import './NotLoggedIn.scss';

const RECOMMENDATIONANON = "RECOMMENDATIONANON";

export default function NotLoggedIn(props) {
  const { recommendationsAnon, transitionNao } = props;

const handleprint = () => {
  window.print()
}
  transitionNao(RECOMMENDATIONANON)
  return (
    <div>
      <div className="div-container-hidden">
      <button className="printHiddenn" onClick={handleprint}>Print Recommendations</button>
      </div>
      <RoomCardList survey={recommendationsAnon} transitionNao={transitionNao}/>
    </div>
  );
}
