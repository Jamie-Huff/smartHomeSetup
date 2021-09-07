const roomArrayFinder = (products) => {
  let roomIdArray = []
  for (let product of products) {

    if (!roomIdArray.includes(product.room_id)) {
      roomIdArray.push(product.room_id)
    }
  }
  return roomIdArray
}

module.exports = roomArrayFinder