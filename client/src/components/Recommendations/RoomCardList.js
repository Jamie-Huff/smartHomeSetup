import React, { useState } from "react";
import { makeStyles } from '@material-ui/styles';

import RoomCard from "./RoomCard";
import { organiseSurvey } from "../../helpers/selectors";



export default function RoomCardList(props) {
  const { survey } = props;
  console.log("IN ROOMCARDLIST, COST OF ROOM1 AS PROP IS+++", survey[0].rooms[0].cost, survey[0].rooms[0] )

  const organisedSurvey = organiseSurvey(survey)

  const surveyRooms = organisedSurvey.map((room) => {
    return <RoomCard className="rooms" key={room.id} products={room.products} name={room.name} avatar={room.avatar} cost={room.cost}/>
  })

  return (
      surveyRooms
  );
}
