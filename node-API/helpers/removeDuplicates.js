const removeDuplicates = (products) => {

  let filteredProducts = products.map((p) => {
    p.quantity = 1
    p.in_home = false
    return p
  })
  let arrayNameHold = [] 
  let productsNoDupes = []

  for (let product of filteredProducts) {

    if (!arrayNameHold.includes(product.name)) {
      arrayNameHold.push(product.name)
      productsNoDupes.push(product)

    } else {
      for (let product2 of productsNoDupes) {
        if (product.name === product2.name) {
          product2.quantity += 1
        }
      }
    }
  }
  return productsNoDupes
}

module.exports = removeDuplicates