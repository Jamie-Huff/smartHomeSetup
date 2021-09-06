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
  if(mode === "ERROR") {
    return "Unfortunately, your budget did not match your selected needs. Please try again"
  }


}

module.exports = {
  naoSurveyQuestions
}