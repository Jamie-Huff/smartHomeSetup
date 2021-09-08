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
import "./Sidebar/naoSpeaksApp.scss";

import ProductListItem from "./ProductListItem";
import useApplicationData from "../hooks/useApplicationData"
import AppContext from "../hooks/appContext"

import SmartVille from "./SmartVille";
import Survey from "./Survey/index";
import Signup from "./Signup";
import Login from "./Login";
import RoomCardList from "./Recommendations/RoomCardList";
import Logout from './Logout'
import NotLoggedIn from "./Recommendations/NotLoggedIn"
import Sidebar from "./Sidebar/Sidebar"




import ProductList from "./ProductList"
import transitions from "@material-ui/core/styles/transitions";

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
    alignItems:"flex-end",
    '@media print' : {
      display: 'none',
}
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
    submitSurveyUser,
    submitSurveyAnon,
    modeNao,
    gotProductHome,
    hasProductStore,
    transitionNao,
    recommendations,
    recommendationsAnon,
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
            <AppContext.Provider value={{ deleteRecommendation, removeProductHome, gotProductHome, hasProductStore }}>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
              <img  className="sidebar__imgLogo" src="images/smartVilleLogo.png" alt="smartvilleLogo"/>
              <Button className={classes.button} variant="outlined" color="primary" onClick={handleSurveyOpen}>
                TAKE SURVEY
              </Button>
                <Logout setuserName={setUsername} userName={username} isloggedin={isloggedin} setIsloggedin={setloggedin} transitionNao={transitionNao} />
              {isloggedin? <Avatar src="images/alpac.jpg" alt="Lit"/>: null}
              <Modal open={open} onClose={handleSurveyClose} className={classes.modal}>
                <Survey submitSurveyAnon={submitSurveyAnon} submitSurveyUser={submitSurveyUser} handleSurveyClose={handleSurveyClose} />
              </Modal>
          </Toolbar>
        </AppBar>

        <main className="layout">
          <section className="sidebar">
            <Sidebar modeNao={modeNao}/>  
          </section>
          <Switch>
          <Route exact path='/'>
              <SmartVille transitionNao={transitionNao} modeNao={modeNao}/>
            </Route>
            <Route path='/products'>
              <div>
                <ProductList products={products} transitionNao={transitionNao}/>
              </div>
            </Route>
            <Route path='/login'>
              <Login setUser={setUsername} setIsloggedin={setloggedin} transitionNao={transitionNao} />

            </Route>
            <Route path='/signup'>
              <Signup setUser={setUsername} setIsloggedin={setloggedin} transitionNao={transitionNao}/>
            </Route>
            <Route path='/profile'>
              <div className="rooms">
                <RoomCardList survey ={recommendations} transitionNao={transitionNao}/>
              </div>
            </Route>
            <Route path='/notLoggedIn'>
              <div className="rooms">
                <NotLoggedIn recommendationsAnon={recommendationsAnon} transitionNao={transitionNao}/>
              </div>
            </Route>
          </Switch>
        </main>
      </ThemeProvider>
      </AppContext.Provider>

    </Router>
  );
}
