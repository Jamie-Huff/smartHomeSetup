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
    return "Hey there, welcome to smartville"
  }

  if(mode === "PRODUCTS") {
    return "Here are all the smart products I have for you, take the survey for recommendations"
  }
}

module.exports = {
  naoSurveyQuestions,
  naoSidebar
}