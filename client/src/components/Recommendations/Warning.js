import React from 'react';

import Button from '@material-ui/core/Button';

import "./Warning.scss";

export default function Warning(props){
  const { deleteRewind, deleteConfirm } = props

  return(	
    <section className="rec__card  rec__card-warning">
       <div className="rec__card  rec__card-warningRewind" onClick={deleteRewind}>
         X
       </div>
      
      <h1 className="rec__card  rec__card-warningText">
        Are you sure you want to delete this?
      </h1>
      <Button variant="outlined" color="secondary" className="rec__card  rec__card-confirm" onClick={deleteConfirm}>
				Delete Recommendation      
      </Button>
    </section>
  )
}