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
    const newRoomVar = roomVar.toLowerCase()
    console.log("ROOMVAR IS+++", roomVar)
    if (newRoomVar === "livingroom" || roomVar === "laundryroom" || roomVar === "entryway") {
      if (newRoomVar === "livingroom") {
        newRooms.push('common area');
      } 
  
      if (newRoomVar === "laundryroom") {
        newRooms.push('laundry room');
      } 
  
      if (newRoomVar === "entryway") {
        newRooms.push('entrance way')
      } 
    } else {
      newRooms.push(newRoomVar)
    }   
  }
  return newRooms;
}

const checkForUser = () => {
  return JSON.parse(localStorage.getItem("user_token"));
}

const formDataForSurvey = (budget, provider, categories, rooms, user) => {
  const apiObj = {}

  apiObj.budget = Number(budget);
  apiObj.provider = provider;
  apiObj.categories = categories;
  apiObj.rooms = rooms;
  apiObj.user = user

  return apiObj;
}

const formDataForHome = (product_id, user) => {
  const apiObj = {};

  apiObj.user = user;
  apiObj.product_id = product_id;

  return apiObj;
}

module.exports = {
  setupCategories,
  setUpRooms,
  formDataForSurvey,
  formDataForHome,
  checkForUser
}



 
