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

  let surveyRooms;
  console.log(survey)

  if (survey[0]) {
    const organisedSurvey = organiseSurvey(survey, hasProductStore)

    surveyRooms = organisedSurvey.map((room) => {

      return  <RoomCard className="rooms" id={room.id} key={room.id}
      products={room.products} name={room.name} avatar={room.avatar}
      cost={room.cost}
    />

    })
  } else {
    return <h1>Loading....</h1>
  }

  return (
    surveyRooms
  );
}
