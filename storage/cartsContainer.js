const fs = require('fs')

class CartsContainer {
  constructor(fileName) {
    this.filename = `./storage/${fileName}`
    this.count = 0
  }
  async newCart() {
    let carts = []
    try {
      carts = await fs.promises.readFile(this.filename, 'utf-8')
      carts = JSON.parse(carts)
      //   carts.lengnth == 0 ? (this.count = [...carts].pop().id) : (this.count = 1)
      if (carts.length == 0) {
        this.count = 1
      } else {
        this.count = [...carts].pop().id
      }
      const newCart = {
        id: this.count + 1,
        timestamp: Date.now(),
        products: []
      }
      carts.push(newCart)
      const cartStr = JSON.stringify(carts, null, 3)
      await fs.promises.writeFile(this.filename, cartStr)
      return newCart
    } catch (error) {
      console.error(error)
    }
  }
  async deleteById(num) {
    try {
      const cartsData = await fs.promises.readFile(this.filename, 'utf-8')
      const carts = JSON.parse(cartsData)
      const id = parseInt(num)
      const foundIndex = carts.findIndex(cart => cart.id === id)

      if (foundIndex !== -1) {
        carts.splice(foundIndex, 1)
        fs.writeFileSync(this.filename, JSON.stringify(carts, null, 2))
        return num
      } else {
        console.log(`ID "${num}" not found`)
        return null
      }
    } catch (err) {
      throw new Error(err)
    }
  }
  async getCartProducts(num) {
    try {
      const cartsData = await fs.promises.readFile(this.filename, 'utf-8')
      const carts = JSON.parse(cartsData)
      const id = parseInt(num)
      const requestedCart = carts.find(cart => cart.id == id)
      if (requestedCart) {
        return requestedCart.products
      }
      return null
      //   carts.forEach(cart => console.log(cart.id))
    } catch (error) {
      console.log(error)
    }
  }
  async addProduct(cartId, prodId) {
    cartId = parseInt(cartId)
    prodId = parseInt(prodId)
    const cartsData = await fs.promises.readFile(this.filename, 'utf-8')
    const prodsData = await fs.promises.readFile(
      './storage/products.json',
      'utf-8'
    )
    const prods = JSON.parse(prodsData)
    const carts = JSON.parse(cartsData)
    let requestedCart = carts.find(cart => cart.id == cartId)

    const prodAlreadyInCart = requestedCart.products.some(
      product => product.id == prodId
    )

    let requestedProd = prods.find(prod => prod.id == prodId)

    if (prodAlreadyInCart) {
      requestedProd = requestedCart.products.find(
        product => product.id == prodId
      )
      const newAmout = requestedProd.amount_units + 1
      requestedProd = { ...requestedProd, amount_units: newAmout }
      const updatedProducts = requestedCart.products.map(product => {
        if (product.id == prodId) {
          product = requestedProd
        }
        return product
      })
      requestedCart.products = updatedProducts
    } else {
      requestedProd = { ...requestedProd, amount_units: 1 }
      requestedCart.products.push(requestedProd)
    }

    const updatedCarts = carts.map(cart => {
      if (cart.id == requestedCart.id) {
        cart = requestedCart
      }
      return cart
    })

    fs.writeFileSync(this.filename, JSON.stringify(updatedCarts, null, 2))

    return requestedCart.id
  }

  async deleteProduct(id_cart, id_product) {
    id_cart = parseInt(id_cart)
    id_product = parseInt(id_product)
    const cartsData = await fs.promises.readFile(this.filename, 'utf-8')
    const carts = JSON.parse(cartsData)
    const requestedCart = carts.find(cart => cart.id == id_cart)
    const productToDeleteIndex = requestedCart.products.findIndex(
      product => product.id == id_product
    )
    if (productToDeleteIndex !== -1) {
      requestedCart.products.splice(productToDeleteIndex, 1)
      const updatedCarts = carts.map(cart => {
        if (cart.index == id_cart) {
          cart = requestedCart
        }
        return cart
      })
      fs.writeFileSync(this.filename, JSON.stringify(updatedCarts, null, 2))
      return id_product
    }
    return null
  }
}

module.exports = CartsContainer
