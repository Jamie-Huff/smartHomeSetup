import React from "react";
import { BrowserRouter as Router, Switch,Route, Link} from "react-router-dom";

import Divider from '@material-ui/core/Divider';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createTheme , createMuiTheme, ThemeProvider, BottomNavigation } from "@material-ui/core";
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

//Declare material ui styling here
const useStyles = makeStyles((theme) => ({
  '@global':{
    main:{
      backgroundColor:"black",
      color:'#f5f5f5'
    }
  },
  appBar: {
    backgroundColor: 'black',
    borderBottom: '1px solid purple'
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


export default function Application(props) {
  const classes = useStyles();
  //material ui theme
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
    submitSurvey,
    editRecommendations,
    switchSurvey
  } = useApplicationData();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar} style={{display:'flex', alignItems:"flex-end"}}>
        <Toolbar > 
            <Button className={classes.button} variant="outlined" color="primary" onClick={handleSurveyOpen}>
              TAKE SURVEY
            </Button>     
            <Avatar src="images/alpac.jpg" alt="Lit"/>
            <Modal open={open} onClose={handleSurveyClose} style={{display:'flex',marginTop:'140px', justifyContent:'center'}}>
              <Survey submitSurvey={submitSurvey}/>
            </Modal>
        </Toolbar>
      </AppBar>

      <main className="layout">

      <section className="sidebar">
          <img className="sidebar--nao" src="images/nao_welcome.png" alt="Nao Chilling"/>
      </section>
      <Router>
        <Switch>
          <Route exact path='/'>
            <ProductListItem/>
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/smartville'>
            <SmartVille/>
          </Route>
        </Switch>
      </Router>
    </main>
  </ThemeProvider>
  );
}
