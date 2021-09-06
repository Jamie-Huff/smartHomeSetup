import React from 'react';

import "./naoSpeaksSurvey.scss";
import { naoSurveyQuestions } from "../../helpers/naoHelp"


export default function Loading(props){

  return(	
    <section className="survey__card-error">
      <img
    		src="images/nao_honhips.png"
    		alt="Loading"
        style={{height:"240px", marginLeft: "88px"}}
  		/>
      <div className="naoBox__speakingError naoBox__speakingError-sb8">
				{ naoSurveyQuestions("ERROR_NO_BUDGET") }
			</div>
      
    </section>
  )
}