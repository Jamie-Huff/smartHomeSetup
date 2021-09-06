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
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import CommentIcon from '@material-ui/icons/Comment';
import FlashOnIcon from '@material-ui/icons/FlashOn';

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
    display:'flex', 
    alignItems:"flex-end"
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "purple",
    border: "2px light #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },

  modal: {
    display:'flex',
    marginTop:'120px', 
    justifyContent:'center'
  },

  button: {
    color:"#dcdcdc"
  }
}));

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
    removeProductHome,
    addProductHome,
    deleteRecommendation,
    switchSurvey,
    isloggedin,
    setloggedin
  } = useApplicationData();
  console.log("RECOMMENDATIONS IS NOW---", recommendations)
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
              <img  className="sidebar__imgLogo" src="images/smartVilleLogo.png" alt="smartvilleLogo"/>
              <Button className={classes.button} variant="outlined" color="primary" onClick={handleSurveyOpen}>
                TAKE SURVEY
              </Button>
                <Logout setuserName={setUsername} userName={username} isloggedin={isloggedin} setIsloggedin={setloggedin} />
              {isloggedin? <Avatar src="images/alpac.jpg" alt="Lit"/>: null}
              <Modal open={open} onClose={handleSurveyClose} className={classes.modal}>
                <Survey submitSurvey={submitSurvey} handleSurveyClose={handleSurveyClose} />
              </Modal>
          </Toolbar>
        </AppBar>

        <main className="layout">
          <section className="sidebar">
            <div className="sidebar__menu">
              <img className="sidebar--nao" src="images/nao_welcome.png" alt="Nao Chilling"/>
              <div className="sidebar__halfTwo">
                <div className="sidebar__menuItem">
                  <FlashOnIcon  className="sidebar__img"/>
                  <span  className="sidebar__text">Getting Started</span>
                </div>
                <div className="sidebar__menuItem">
                  <AddToHomeScreenIcon className="sidebar__img" />
                  <span className="sidebar__text">Products</span>     
                </div>
                <div className="sidebar__menuItem">
                  <CommentIcon className="sidebar__img" />
                  <span className="sidebar__text">Contact Us</span>
                </div>
              </div>     
            </div>          
          </section>
          <Switch>
          <Route exact path='/'>
              <SmartVille/>
            </Route>
            <Route path='/products'>
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
                <RoomCardList survey ={recommendations}/>
              </div>
            </Route>

          </Switch>
        </main>
      </ThemeProvider>
    </Router>
  );
}
