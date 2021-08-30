import React from 'react';




export default function Loading(props){

  return(	
    <section className="survey__card survey__card--status">
      <div style={{display:"flex", marginTop:"40px"}}>
      <img
    		className="survey__status-image"
    		src="images/status.png"
    		alt="Loading"
        style={{height:"60px"}}
  		/>
      <img
    		src="images/nao_dab.png"
    		alt="Loading"
        style={{height:"400px"}}
  		/>
      </div>  
    </section>
  )
}