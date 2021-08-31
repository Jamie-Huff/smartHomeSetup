const setupCategories = (categories, quantities) => {
  const categoryObj = {};

  const categoryKeys = Object.keys(categories);

  for(let category of categoryKeys) {
    if(quantities[category]) {
      categoryObj[category] = {quantity: Number(quantities[category])}
    } else {
      categoryObj[category] = {quantity: 1};  
    }
  }
  return categoryObj
}


const changeToArray = (rooms) => {
  const roomKeys = Object.keys(rooms);

  return roomKeys.filter(x => (rooms[x] === true));
}

const formDataForApi = (budget, provider, categories, rooms) => {
  const apiObj = {}

  apiObj.budget = Number(budget);
  apiObj.provider = provider;
  apiObj.categories = categories;
  apiObj.rooms = rooms;

  return apiObj;
}

module.exports = {
  setupCategories,
  changeToArray,
  formDataForApi
}



 
