const removeDuplicates = (products) => {
  let arrayNameHold = [] 
  let productsNoDupes = []
    // loop through all the products

  for (let product of products) {
    product.quantity = 1
    product.in_home = false

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