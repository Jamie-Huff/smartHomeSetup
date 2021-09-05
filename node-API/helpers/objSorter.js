function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const roomA = a.name.toUpperCase();
  const roomB = b.name.toUpperCase();

  let comparison = 0;
  if (roomA > roomB) {
    comparison = 1;
  } else if (roomA < roomB) {
    comparison = -1;
  }
  return comparison;
}

module.exports = compare