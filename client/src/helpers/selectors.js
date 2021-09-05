const organiseSurvey = (survey, hasProductInStore) => {
  const surveyRooms = []

  for (let room of survey[0].rooms) {
    room.avatar = avatarForRoom(room)
    room.name = nameForRoom(room)

    const roomProducts = [];

    for (let product of survey[0].products) {
      if (product.room_id === room.id) {
        product.stores = findStoresForProduct(product, hasProductInStore)
        roomProducts.push(product);
      }
    }
    room.products = roomProducts;
    surveyRooms.push(room);
  }
  return surveyRooms
}

const nameForRoom = (room) => {
  if(room.id === 4){
    return 'Living Room'
  }

  if(room.id === 3){
    return 'Kitchen'
  }

  if(room.id === 2){
    return 'Bedroom'
  }

  if(room.id === 5){
    return 'Bathroom'
  }

  if(room.id === 9){
    return 'Laundry Room'
  }

  if(room.id === 7){
    return 'Garage'
  }

  if(room.id === 8){
    return 'Entrance Way'
  }

  if(room.id === 6){
    return 'Yard'
  }

  if(room.id === 1){
    return 'Anywhere in your Home'
  }
}

const avatarForRoom = (room) => {
  
    if(room.id === 4){
      return '🛋️'
    }

    if(room.id === 3){
      return '🍲'
    }

    if(room.id === 2){
      return '🛏️'
    }

    if(room.id === 5){
      return '🛁'
    }

    if(room.id === 9){
      return '🧺'
    }

    if(room.id === 7){
      return '🚠'
    }

    if(room.id === 8){
      return '​🚪​🚶‍♂️​'
    }

    if(room.id === 6){
      return '🌳🚪'
    }

    if(room.id === 1){
      return '🏡'
    }
}

const avatarForProduct = (product) => {
    if(product.category_id === 2 || product.category_id === 3){
      return '💡'
    }

    if(product.category_id === 1){
      return '📟'
    }

    if(product.category_id === 4 || product.category_id === 5 || product.category_id === 6 || product.category_id === 15){
      return '🛡️'
    }

    if(product.category_id === 7 || product.category_id === 8 || product.category_id === 9 || product.category_id === 10 || product.category_id === 11 || product.category_id === 12 || product.category_id === 14){
      return '🔌'
    }

    if(product.category_id === 13){
      return '🎚'
    }

    if(product.category_id === 16){
      return '🔊'
    }

    if(product.category_id === 17){
      return '📺'
    }

    if(product.category_id === 18){
      return '🚠'
    }
  
}

const findStoresForProduct = (product, hasProductStore) => {
  const storesForProduct = []

  for(let findProduct of hasProductStore ) {

    if(findProduct.product_id > product.id) {
      return storesForProduct
    }
    const theStore = {}
    if(product.id === findProduct.product_id){
      theStore.name = nameForStore(findProduct)
      theStore.productLink = findProduct.link_to_product
    }
    if(Object.keys(theStore).length !== 0) {
      storesForProduct.push(theStore);
    }
  }

  return storesForProduct;
}

const nameForStore = (findProduct) =>{
  if(findProduct.store_id === 1){
    return "Walmart"
  }

  if(findProduct.store_id === 2) {
    return "Bestbuy"
  }

  if(findProduct.store_id === 3){
    return "Amazon"
  }
}

module.exports = {
  organiseSurvey,
  avatarForProduct
}