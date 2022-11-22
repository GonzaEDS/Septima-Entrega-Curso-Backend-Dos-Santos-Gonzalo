const express = require('express')
const roleMiddleware = require('../../middlewares/roleMiddleware')
const router = express.Router()

const products = require('./../../../storage/products')

router.post('/', roleMiddleware, async (req, res, next) => {
  try {
    const newProduct = await products.save(req.body)
    res.status(200).json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (_req, res, next) => {
  try {
    let data = await products.getAll()
    if (data) {
      //   res.render('pages/index', { data, page: 'table', title: 'Products view' })
      res.status(200).send(data)
    } else {
      res.status(404).json({
        response: 'can not find'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.get('/random', async (_req, res, next) => {
  try {
    let data = []
    data.push(await products.getOne())

    if (data) {
      //   res.render('pages/index', {
      //     data,
      //     page: 'table',
      //     title: 'Random product'
      //   })
      res.status(200).send(data)
    } else {
      res.status(404).json({
        response: 'can not find'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', roleMiddleware, async (req, res, next) => {
  let { id } = req.params
  try {
    let data = await products.putById(id, req.body)
    if (data) {
      res.status(200).json({
        response: data
      })
    } else {
      res.status(404).json({
        response: 'can not find'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', roleMiddleware, async (req, res, next) => {
  console.log('deletebyid')
  let { id } = req.params
  try {
    let data = await products.deleteById(id)
    if (data) {
      res.status(200).json({
        response: 'product deleted'
      })
    } else {
      res.status(404).json({
        response: 'can not find'
      })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
