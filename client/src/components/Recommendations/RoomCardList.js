import React, { useState } from "react";
import { makeStyles } from '@material-ui/styles';

import RoomCard from "./RoomCard";
import useApplicationData from "../../hooks/useApplicationData";

import { organiseSurvey } from "../../helpers/selectors";

export default function RoomCardList(props) {
  const { survey } = props;

  const {
    hasProductStore
  } = useApplicationData();

  const organisedSurvey = organiseSurvey(survey, hasProductStore)

  const surveyRooms = organisedSurvey.map((room) => {
    return <RoomCard className="rooms" key={room.id} products={room.products} name={room.name} avatar={room.avatar} cost={room.cost}/>
  })

  return (
      surveyRooms
  );
}
