require('dotenv').config()
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams);
db.connect()
  .catch(err => {
    console.error(err)
  })


// let users = ''
// because this function is async it wont give us our data back properly need to have it all in a callback
const userListGenerator = (db) => {
  return db.query('SELECT * FROM PRODUCTS;')
    .then(data => {
      const users = data.rows
      return users
    })
}






// const logUser = async () => {
//   return userListGenerator(db)
//     .then(result => {
//       // console.log('@@@', result)
//       const sorted = sortCategory(result)
//       return sorted
//     })
// }

// const log2 = async () => {
//   try {
//     const result = await db.query('SELECT * FROM USERS WHERE id = 1;')
//     // console.log('#####', result.rows)
//     return result.rows
//   } catch (error) {
//     console.log('err@@', error)
//   }
// }

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
    },
  4: {
    id: 70,
    name: 'vaccume 2',
    description: 'short desc',
    image: 'img link',
    price: 189.99,
    category_id: 7,	
    room_id: 1
    },
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

const generateProductsInCategory = function (products, categories) {
  // sets categoriesArray equal to an array version of the categories a customer is looking for
  const categoriesArray = categoryArray(categories)
  // categoryProductGrouping is equal to an object which will contain our products related to each category
  let categoryProductGrouping = {}
  for (const category of categoriesArray) {
    categoryProductGrouping[category]= []
  }
  for (const product in products) {
    if (categoriesArray.includes(products[product].category_id)) {
      categoryProductGrouping[products[product].category_id].push(products[product])
    }
  }
  return categoryProductGrouping
}

// filter through the products and add the products to local hold depending on the lowest val
const reccomendedProductByPrice = function(products, budget, categories, room) {
  let localHold = {
    productIds: [],
    budgetRemaining: budget
  }
  console.log(products)
}
//console.log(generateProductsInCategory(filteredProducts, data.categories))
// console.log(reccomendedProductByPrice(generateProductsInCategory(filteredProducts, data.categories)))