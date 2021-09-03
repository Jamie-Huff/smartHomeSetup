import React from "react";
import { BrowserRouter as Router, Switch,Route, Link} from "react-router-dom";

import Divider from '@material-ui/core/Divider';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createTheme , createMuiTheme, ThemeProvider } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';

import "./Application.scss";
import ProductListItem from "./ProductListItem";
import useApplicationData from "../hooks/useApplicationData"
import SmartVille from "./SmartVille";
import Survey from "./Survey/index";
import Signup from "./Signup";
import Login from "./Login";
import RoomCardList from "./Recommendations/RoomCardList";
import Logout from './Logout'

import ProductList from "./ProductList"

//Declare material ui styling here
const useStyles = makeStyles((theme) => ({
  '@global':{
    main:{
      backgroundColor:"#001029",
      color:'#f5f5f5'
    }
  },
  appBar: {
    backgroundColor: '#001029',
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "purple",
    border: "2px light #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },

  button: {
    color:"#dcdcdc"
  }
}));

//fakeData
const products = [
  {
    id: 1,
    room_id: 3,
    category_id: 2,
    name: "phillips hue",
    description: "Amazing product Get A Copywriter. Native English speakers. Unlimited revisions. 100% money-back guarantee. Order now! 100% unique content by copywriters with local knowledge. Reviewed by senior editors. 100% money-back guarantee. Reliable delivery. Fast turnaround.",
    price: 20099,
    image:"Lit Image",
    quantity:2

  },
  {
    id: 2,
    room_id: 2,
    category_id: 16,
    name: "sonos one",
    description: "Super Amazing product",
    price: 27599,
    image: "Another Lit Image",
    quantity:3
  },
  {
    id: 3,
    room_id: 2,
    category_id: 4,
    name: "Selection camera",
    description: "Beyond Amazing product",
    price: 50099,
    image: "Just the very best image",
    quantity:1
  },
  {
    id: 4,
    room_id: 3,
    category_id: 6,
    name: "door bell",
    description: "Super Amayzung",
    price: 22099,
    image:"Lit Eyy Image",
    quantity:1
  },
  {
    id: 5,
    room_id: 4,
    category_id: 8,
    name: "Fridge",
    description: "Super Amayzliung",
    price: 22199,
    image:"Lit sheswut Image",
    quantity:1
  },
]

const survey = [
  {
   id: 1,
   user_id: 2,
   rooms: [{id:3, name: "kitchen", cost: 29909}, {id: 2, name: "bedroom", cost: 400099}, {id: 4, name: "common area", cost: 170000}],
   products: products,
 }
]



export default function Application(props) {
  const classes = useStyles();

  // material ui theme
  const theme = createTheme({
    palette: {
      background: {
        main: 'white',
      },
    }
  });

  const [open, setOpen] = React.useState(false);

  const handleSurveyOpen = () => {
    setOpen(true);
  };

  const handleSurveyClose = () => {
    setOpen(false);
  };

  const {
    products,
    rooms,
    surveys,
    username,
    setUsername,
    submitSurvey,
    recommendations,
    editRecommendations,
    switchSurvey,
    isloggedin,
    setloggedin
  } = useApplicationData();
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar} style={{display:'flex', alignItems:"flex-end"}}>
          <Toolbar>
              <Button className={classes.button} variant="outlined" color="primary" onClick={handleSurveyOpen}>
                TAKE SURVEY
              </Button>
                <Logout userName={username} isloggedin={isloggedin} setIsloggedin={setloggedin} />
              <Avatar src="images/alpac.jpg" alt="Lit"/>
              <Modal open={open} onClose={handleSurveyClose} style={{display:'flex',marginTop:'140px', justifyContent:'center'}}>
                <Survey submitSurvey={submitSurvey} handleSurveyClose={handleSurveyClose} />
              </Modal>
          </Toolbar>
        </AppBar>

        <main className="layout">
          <section className="sidebar">
            <img className="sidebar--nao" src="images/nao_welcome.png" alt="Nao Chilling"/>
          </section>
          <Switch>
            <Route exact path='/'>
              <div>
                <ProductList products={products}/>
              </div>
            </Route>
            <Route path='/login'>
              <Login setUser={setUsername} setIsloggedin={setloggedin} />

            </Route>
            <Route path='/signup'>
              <Signup setUser={setUsername} setIsloggedin={setloggedin} />
            </Route>
            <Route path='/profile'>
              <div className="rooms">
                <RoomCardList survey ={survey}/>
              </div>
            </Route>
            <Route path='/smartville'>
              <SmartVille/>
            </Route>
          </Switch>
        </main>
      </ThemeProvider>
    </Router>
  );
}
