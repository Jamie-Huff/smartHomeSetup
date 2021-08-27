import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Divider from '@material-ui/core/Divider';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createTheme , createMuiTheme, ThemeProvider, BottomNavigation } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import "./Application.scss";
import ProductListItem from "./ProductListItem";
import useApplicationData from "../hooks/useApplicationData"
import SmartVille from "./SmartVille";

const useStyles = makeStyles((theme) => ({
  '@global':{
    main:{
      backgroundColor:"black",
      color:'white'
    }
  },
  
  appBar: {
    backgroundColor: 'black',
    borderBottom: '1px solid purple'
  }
}));


export default function Application(props) {
  const classes = useStyles();

  const theme = createTheme({
    palette: {
      background: {  
        main: 'white',
      },
    }
  });

  const {
    state

  } = useApplicationData();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <AppBar position="static" className={classes.appBar} style={{display:'flex', alignItems:"flex-end"}}>
        <Toolbar >      
            <Avatar src="images/alpac.jpg" alt="Lit"/>
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
          {/* <Route path='/login'>
            <Login/>
          </Route>
          <Route path='/signup'>
            <Signup/>
          </Route> */}
          <Route path='/smartville'>
            <SmartVille/>
          </Route>
        </Switch> 
      </Router>  
    </main>
  </ThemeProvider>
    
    
      
    
    
  );
}
