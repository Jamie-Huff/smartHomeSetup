const naoSurveyQuestions = (mode) => {
  if (mode === "BUDGET") {
    return "How much are you looking to spend?"
  }

  if(mode === "PROVIDER") {
    return "Do you use Android, Apple or both products?"
  }

  if(mode === "ROOMS") {
    return "What rooms are you looking to make smart?"
  }

  if(mode === "CATEGORIES") {
    return "What types of products are you looking for?"
  }
  if(mode === "ERROR_NO_BUDGET") {
    return "Unfortunately, your budget does not match your selected needs. Please try again"
  }
}

const naoSidebar = (mode) => {
  if(mode === "WELCOME") {
    const naoSpeaksObj = { heSays: ["Take the survey to start setting up your smart home"],
      img:"images/nao_peace.png" }
    return naoSpeaksObj
  }

  if(mode === "PRODUCTS") {
    const naoSpeaksObj = { heSays: ["Here are some of the products I have for you",
      "Take the survey to start setting up your smart home"],
      img:"images/nao_turnedLeft.png" }
    return naoSpeaksObj
  }

  if(mode === "LOADING") {
    const naoSpeaksObj = { heSays:["Hang tight..."],
      img:"images/nao_hangTight.png" }
    return naoSpeaksObj
  }

  if(mode === "RECOMMENDATION") {
    const naoSpeaksObj = { heSays:["Here are your recommendations",
      "Keep track of your purchased products by using the checkbox"],
      img:"images/nao_pointing.png" }
    return naoSpeaksObj
  }

  if(mode === "RECOMMENDATIONANON") {
    const naoSpeaksObj = { heSays:["Here are your recommendations",
      "You can download a Pdf of your recommendations"],
      img:"images/nao_pointing.png" }
    return naoSpeaksObj
  }

  if(mode === "LOGIN" || mode === "SIGNUP") {
    const naoSpeaksObj = { heSays:["Please Login/Signup to have the best smartville experience"],
      img:"images/nao_come.png" }
    return naoSpeaksObj
  }

  if(mode === "NOTHING") {
    const naoSpeaksObj = { heSays:["Hi, My name is Nao, I'l be your guide today"],
      img:"images/nao_come.png" }
    return naoSpeaksObj
  }

  if(mode === "LOGOUT") {
    const naoSpeaksObj = { heSays:["Hope you had a great experience at Smartville"],
      img:"images/nao_normal.png" }
    return naoSpeaksObj
  }

  if(mode === "GETSTARTED") {
    const naoSpeaksObj = { heSays:["Hi, My name is Nao, I'll be your guide through SmartVille"], 
      img:"images/nao_normal.png" }
    return naoSpeaksObj
  }

  if(mode === "GENERAL") {
    const naoSpeaksObj = { heSays:["Hope you had a great experience at Smartville"], 
      img:"images/nao_normal.png" }
    return naoSpeaksObj
  }

  if(mode === "MAJOR") {
    const naoSpeaksObj = { heSays:["Hope you had a great experience at Smartville"], 
      img:"images/nao_normal.png" }
    return naoSpeaksObj
  }
}

const naoGettingStarted = (mode) => {
  if(mode === "GETSTARTED") {
    const naoSpeaksObj = { heSays:["Hi there! My name is Nao, and i'll be your guide through Smartville"], 
      img:"images/nao_normal.png" }
    return naoSpeaksObj
  }

  if(mode === "GENERAL") {
    const naoSpeaksObj = { heSays:["Let us begin to set up your smart home. Its nice to have an app where you can control all the smart devices in your home"], 
      img:"images/nao_normal.png" }
    return naoSpeaksObj
  }

  if(mode === "MAJOR") {
    const naoSpeaksObj = { heSays:["If you Android is your favourite provider, you can begin by downloading Google Home from the App store"],
      img:"images/nao_normal.png" }
    return naoSpeaksObj
  }
}

module.exports = {
  naoSurveyQuestions,
  naoSidebar,
  naoGettingStarted
}