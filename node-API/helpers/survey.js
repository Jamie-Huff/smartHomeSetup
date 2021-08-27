
const data = {
  budget: 500,
  categories: {
    // products have a default quantity of 1
    5: {
      id: 5,
      name: 'interior cameras',
      quantity: 5
    },
    1: {
      id: 1,
      name: 'hubs',
      quantity: 1
    },
    7: {
      id: 7,
      name: 'vaccumes',
      quantity: 1
    }
  },
  rooms: ['common area', 'inspecific']
}

const products = {
  1: {
  id: 1,
  name: 'Google Nest Hub Max',
  description: 'short desc',
  image: 'img link',
  price: 299.00,
  category_id: 1,	
  room_id: 1
  },
  2: {
    id: 13,
    name: 'Kyvol Cybovac E30 Robot Vacuum Cleaner',
    description: 'short desc',
    image: 'img link',
    price: 189.99,
    category_id: 7,	
    room_id: 1
    },
  3: {
    id: 4,
    name: 'camera',
    description: 'short desc',
    image: 'img link',
    price: 189.99,
    category_id: 8,	
    room_id: 1
    }
}

// the purpose of generate survey resutls, is too generate a formatted version of the products
// that are suggested for the users home
// depending on what answers they give, will effect the products suggested


// using our categories, filters them down into an array
const categoryArray = function(catagories) {
  let array = []
  for (const category in catagories) {
    array.push(Number(category))
  }
  return array
}

// possible products will filter through a database query of the products,
// using the catagories from data passed from the front end
// we will return a new array of objects containing our possible products regardless of other factors
const possibleProducts = function (categories) {
  // this value contains the array of categories of products we are looking for
  let categoryAllowed = categoryArray(categories)
  // empty final object of reccomended products
  let productsByCatagories = []
  for (const product in products) {
    if (categoryAllowed.includes(products[product].category_id)) {
      productsByCatagories.push(products[product]);
    }
  }
  // need to go through our fake products and select only the ones whos catagory matches
  return productsByCatagories
}
let filteredProducts = possibleProducts(data.categories, products)

const generateSurveyResults = function (products, budget, categories, rooms) {
  let localVal = {
    products: [],
    balanceRemaining: budget
  }
  

  console.log('1', products)
  console.log('2', budget)
  console.log('3', categories)
  console.log('4', rooms)


}

console.log(generateSurveyResults(filteredProducts, data.budget, data.categories, data.rooms))
