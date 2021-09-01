const categoryFinder = (query) => {
  let categories = []
  for (const category in query.categories) {
    if (category === 'lights') {
      categories.push(
        {quantity: query.categories[category].quantity, name: 'interior lights', id: 2}, 
        {quantity: query.categories[category].quantity, name: 'yard lights', id: 3})
    }
    if (category === 'speakers') {
      categories.push(
        {quantity: query.categories[category].quantity, name: 'speakers', id: 16})
    }
    if (category === 'hubs') {
      categories.push(
        {quantity: query.categories[category].quantity, name: 'hubs', id: 1})
    }
    if (category === 'appliances') {
      categories.push(
        {quantity: query.categories[category].quantity, name: 'vaccumes', id: 7},
        {quantity: query.categories[category].quantity, name: 'refrigerators', id: 8},
        {quantity: query.categories[category].quantity, name: 'stoves', id: 9},
        {quantity: query.categories[category].quantity, name: 'dishwashers', id: 10},
        {quantity: query.categories[category].quantity, name: 'washers', id: 11},
        {quantity: query.categories[category].quantity, name: 'dryers', id: 12},
        {quantity: query.categories[category].quantity, name: 'coffee makers', id: 14},
        {quantity: query.categories[category].quantity, name: 'televisions', id: 17})
    }
    if (category === 'thermostat') {
      categories.push(
        {quantity: query.categories[category].quantity, name: 'thermostats', id: 13})
    }
    if (category === 'security') {
      categories.push(
        {quantity: query.categories[category].quantity, name: 'yard cameras', id: 4},
        {quantity: query.categories[category].quantity, name: 'interior camears', id: 5},
        {quantity: query.categories[category].quantity, name: 'door locks', id: 15},
        {quantity: query.categories[category].quantity, name: 'door bells', id: 6})
    }
    if (category === 'garage') {
      categories.push(
        {quantity: query.categories[category].quantity, name: 'garage door opener', id: 18})
    } 
  }
  return categories
}

module.exports = categoryFinder