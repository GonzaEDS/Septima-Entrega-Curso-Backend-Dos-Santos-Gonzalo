const express = require('express')
const router = express.Router()
const carts = require('./../../../storage/carts')

router.get('/', (_req, res, next) => {
  try {
    res.status(200).json({ status: 'ok' })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (_req, res) => {
  try {
    const new_Cart = await carts.newCart()
    console.log(new_Cart.id)
    const id = new_Cart.id
    res.status(200).send({ id })
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', async (req, res) => {
  let { id } = req.params
  try {
    let deletedCart = await carts.deleteById(id)
    if (deletedCart) {
      res.status(200).json({
        response: `cart ${deletedCart} deleted`
      })
    } else {
      res.status(404).json({
        response: 'can not find'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      response: 'error'
    })
  }
})

router.get('/:id/products', async (req, res) => {
  try {
    let { id } = req.params
    const getCartProducts = await carts.getCartProducts(id)
    if (getCartProducts) {
      res.status(200).send(getCartProducts)
    } else {
      res.status(404).json({
        response: 'can not find'
      })
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/:id/products', async (req, res) => {
  let { productId } = req.body
  let { id } = req.params
  try {
    const addedProd = await carts.addProduct(id, productId)
    res.status(200).send({ id: addedProd })
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id_cart/products/:id_product', async (req, res) => {
  try {
    let { id_cart, id_product } = req.params
    console.log(id_cart, id_product)
    const deletedProduct = await carts.deleteProduct(id_cart, id_product)
    if (deletedProduct) {
      res.status(200).send({ id: deletedProduct })
    }
    res.status(404).json({
      response: 'can not find'
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
