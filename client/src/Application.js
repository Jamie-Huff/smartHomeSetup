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
import useApplicationData from "hooks/useApplicationData"
import "./Application.scss";
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
    state,
    // setDay,
    // bookInterview,
    // cancelInterview
  } = useApplicationData();

  // const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  // const appointments = dailyAppointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);
  //   const interviewers = getInterviewersForDay(state, state.day);

  //   return <Appointment key={appointment.id} id={appointment.id} 
  //     time={appointment.time} interview={interview}
  //     interviewers={interviewers}/>
  // })
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
            <Appointment/>
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
