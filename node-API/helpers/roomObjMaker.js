const roomObjMaker = async (rooms, products, db) => {
  let roomsArray = []
  for (const room of rooms) {
    let roomObj = {name: null, id: room, cost: 0}
    let roomDetails = (await db.query(`SELECT * FROM rooms WHERE id = $1`, [room])).rows[0]
    roomObj.name = await roomDetails.name

    for (const product of products) {
      if (product.room_id === room) {
        roomObj.cost += product.price
      }
    }
    roomsArray.push(roomObj)
  }
  return roomsArray
}

module.exports = roomObjMaker