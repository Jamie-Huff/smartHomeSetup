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

const setUpRooms = (rooms) => {
  const roomKeys = Object.keys(rooms);
  const roomVars = roomKeys.filter(x => (rooms[x] === true));

  let newRooms = []

  for (let roomVar of roomVars) {
    roomVar.toLowerCase()

    if (roomVar === "livingRoom" || roomVar === "laundryRoom" || roomVar === "entryWay") {
      if (roomVar === "livingRoom") {
        newRooms.push('common area');
      } 
  
      if (roomVar === "laundryRoom") {
        newRooms.push('laundry room');
      } 
  
      if (roomVar === "entryWay") {
        newRooms.push('entrance way')
      } 
    } else {
      newRooms.push(roomVar)
    }   
  }
  return newRooms;
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
  setUpRooms,
  formDataForApi,
  checkForUser
}



 
