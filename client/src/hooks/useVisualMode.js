import { useState } from "react";

export default function useVisualMode (initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]); // This line is new!

  const transition = (newMode, replace) => { 
    if(replace) {
      popHistory()
    }
    setHistory(prevHistory => [...prevHistory, newMode])
    setMode(newMode);
    return;   
  }

  const back = () => {  
    const historyLength = history.length

    if (historyLength > 1) {
      setMode(history[historyLength - 2]);
      popHistory();      
    }      
    return 
  }

  const popHistory = () => {
    const historyLength = history.length

    const newHistory = history.filter((_, i) => i !== historyLength - 1);
    setHistory(newHistory);

    return;
  }
  
  return {
    mode,
    transition,
    back 
  }
}