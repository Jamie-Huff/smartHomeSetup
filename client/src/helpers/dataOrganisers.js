const setupCategories = (categories, quantities) => {
  const categoryObj = {};

  const categoryKeys = Object.keys(categories);

  for(let category of categoryKeys) {
    if(categories[category]) {
      if(quantities[category]) {
        categoryObj[category] = {quantity: Number(quantities[category])}
      } else {
        categoryObj[category] = {quantity: 1};  
      }
    }   
  }
  return categoryObj
}


const changeToArray = (rooms) => {
  const roomKeys = Object.keys(rooms);

  return roomKeys.filter(x => (rooms[x] === true));
}

const checkForUser = () => {
  return JSON.parse(localStorage.getItem("user_token"));
}

const formDataForApi = (budget, provider, categories, rooms, user) => {
  const apiObj = {}

  apiObj.budget = Number(budget);
  apiObj.provider = provider;
  apiObj.categories = categories;
  apiObj.rooms = rooms;
  apiObj.user = user

  return apiObj;
}

module.exports = {
  setupCategories,
  changeToArray,
  formDataForApi,
  checkForUser
}



 
