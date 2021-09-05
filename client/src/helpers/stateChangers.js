const deleteProduct = (rec, productId) => {
  console.log("REC", rec)

  const products = [...rec[0].products]
  const fakeRec = [...rec];

  const newProd = products.filter(x => x.id !== productId)
  fakeRec[0].products = newProd

  console.log("FAKERECPROD", fakeRec[0].products)
}

module.exports = {
  deleteProduct
}