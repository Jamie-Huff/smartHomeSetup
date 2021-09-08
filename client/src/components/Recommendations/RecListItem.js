import React, { useState } from "react";
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import { checkForUser, formDataForHome } from "../../helpers/dataOrganisers"
import useVisualMode from "../../hooks/useVisualMode";
import Warning from "./Warning";


import Checkbox from './Checkbox'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from '@material-ui/core/Link';

import "./RecListItem.scss";

const FLOW = "FLOW";
const WARNING = "WARNING";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: 350,
    backgroundColor: '#323949',
    margin:'20px',
    color:"white",
    borderRadius:"8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight:"615px"
  },
  rootInHome: {
    maxWidth: 345,
    width: 350,
    backgroundColor: '#908e90',
    margin:'20px',
    color:"white",
    borderRadius:"8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color:"black"
  },
  none: {
    display: "none"
  },
  media: {
    height: 220,
    margin: "5px 20px 20px 20px",
    borderRadius:"2px",
    backgroundSize: "contain",
    backgroundColor: "#fff",
  },
  avatar: {
    backgroundColor: '#535e79',
  },
  infoIcon: {
    marginLeft: '-10px',
    color:"white",
    '&:hover': {
      color: "#FBE889",
    },
  },
  deleteIcon: {
    marginLeft: '-10px',
    color:"white",
    '&:hover': {
      color: "#DE9196",
    },
  },
  deleteIconHome: {
    marginLeft: '-10px',
    color:"black"
  },
  infoIconHome: {
    marginLeft: '-10px',
    color:"black"
  },
  cardHeader: {
    fontSize:"1em",
    fontWeight:'bold'
  },
  checkBox: {
    marginTop:"2px"
  },
  price: {
    marginLeft:"10px",
    fontWeight:600
  },
  content: {
    color:"white",
    fontWeight:500,
    fontFamily: "Arial"
  },
  contentHome: {
    color:"Black",
    fontWeight:500,
    fontFamily: "Arial"
  },
  quantity: {
    color:"yellow",
    marginLeft:"10px"
  },
  store: {
    margin:"10px 0px 0px 20px",
    color:"#b2ec5d"
  },
  stores: {
    display:"flex",
    justifyContent:"flex-start"
  },
  special: {
    backgroundColor: "#fff",
    borderRadius: "2px",
    margin: "0px 16px",
    paddingTop: "2px",
  }
}));

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) : str;
}

export default function RecListItem(props) {

  const { id, title, image, price, info, desc, avatar, stores,
          quantity, deleteRec, deleteProductHome, addProductHome } = props

  const classes = useStyles();
  const [checkedProduct, setCheckedProduct] = useState(false);
  const [prodInHome, setProdInHome] = useState(false);
  const { mode, transition, back } = useVisualMode(FLOW)

  const user = checkForUser();

  const handleDeleteRec = () => {

    transition(WARNING);
  }

  const handleDeleteConfirm = () => {
    const removeRecObj = formDataForHome(id, checkForUser());

    deleteRec(removeRecObj);
  }

  const handleDeleteRewind = () => {
    back()
  }

  const handleProdHome = (checkedStatus) => {
    const prodHomeObj = formDataForHome(id, checkForUser());

    if(!checkedProduct){
      addProductHome(prodHomeObj)
      setProdInHome(!prodInHome)
    } else {
      deleteProductHome(prodHomeObj)
      setProdInHome(!prodInHome)
    }

    setCheckedProduct(checkedStatus)
  }

  return (
    <Card className={ clsx(
        classes.root,
        // classes.black,
        {
          [classes.black]: prodInHome,
          [classes.rootInHome]: prodInHome
        }
    )}>
      { mode === FLOW &&
        <React.Fragment>
        <div>
          <CardHeader
            avatar = {
              <Avatar aria-label="recipe" className={classes.avatar}>
                {avatar}
              </Avatar>
            }
            action={
              <Checkbox handleProdHome={handleProdHome} 
                checkedProduct={checkedProduct}
                user={user}
              />
            }
            title={truncate(title, 57)}
            classes={{
              title: clsx(classes.cardHeader),
              action: classes.checkBox
            }}
          />
          <div className={classes.stores}>
            {
              stores.map((store) =>{
                return <a href={store.productLink} className={classes.store}>
                  {store.name}
                </a>
              })
            }
          </div>
          <div className={classes.special}>
            <CardMedia
              className={classes.media}
              image={image}
              title={title}
            />
          </div>
          <CardContent>
            <div className= { prodInHome ? classes.contentHome : classes.content }>
              {
                desc
              }
            </div>
          </CardContent>
        </div>
        <div>
          <CardActions className="rec__actions">
            <div>
              <div className={classes.price}>
                ${price/100}
                {(quantity > 1) &&
                  <span className={classes.quantity}>x{quantity}</span>
                }
              </div>
            </div>
            <div>
              <IconButton>
                <InfoIcon className={ prodInHome ? classes.infoIconHome : classes.infoIcon }/>
              </IconButton>
              <IconButton className={clsx({[classes.none] : !user })}>
                <DeleteIcon onClick={handleDeleteRec} className={ prodInHome ? classes.deleteIconHome : classes.deleteIcon }/>
              </IconButton>
            </div>
          </CardActions>
        </div>


        </React.Fragment>
      }

      { mode === WARNING &&
        <Warning deleteRewind={handleDeleteRewind} deleteConfirm={handleDeleteConfirm} />
      }
    </Card>
  );
}
