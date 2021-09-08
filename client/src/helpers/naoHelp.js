const naoSurveyQuestions = (mode) => {
  if (mode === "BUDGET") {
    return "Enter your budget $$"
  }
  
  if(mode === "PROVIDER") {
    return "Do you use android, apple or both products?"
  }

  if(mode === "ROOMS") {
    return "Select all the rooms you'd like to make smart"
  }

  if(mode === "CATEGORIES") {
    return "Select all the kind of products you'd like to have"
  }
  if(mode === "ERROR_NO_BUDGET") {
    return "Unfortunately, your budget does not match your selected needs. Please try again"
  }
}

const naoSidebar = (mode) => {
  if(mode === "WELCOME") {
    const naoSpeaksObj = { heSays: ["Hi, My name is Nao, I'l be your guide today"], 
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
}

module.exports = {
  naoSurveyQuestions,
  naoSidebar
}