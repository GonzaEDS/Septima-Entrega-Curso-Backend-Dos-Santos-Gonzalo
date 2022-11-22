const ProductsContainer = require('./productsContainer')

const products = new ProductsContainer('products.json')

module.exports = products

const test1 = async () => {
  await products.save({
    name: 'Escuadra',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    price: 123.42,
    thumbnail:
      'https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-16-1024.png'
  })
  await products.save({
    name: 'Regla',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    price: 23.34,
    thumbnail:
      'https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-16-1024.png'
  })
  await products.save({
    name: 'Calculadora',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    price: 134.45,
    thumbnail:
      'https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_calculator-1024.png'
  })
  await products.save({
    name: 'Globo terraqueo',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    price: 200.5,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-1024.png'
  })

  await products.save({
    name: 'Microscopio',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    price: 2100.45,
    thumbnail:
      'https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-10-1024.png'
  })
}
// test1()

const test2 = async () => {
  let productsAll = await products.getAll()
  console.log(productsAll)
}
