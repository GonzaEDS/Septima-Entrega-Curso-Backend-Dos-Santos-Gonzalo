const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const productDTO = require('./../dto/product.dto')

class ProductsContainer {
  constructor(fileName) {
    this.filename = `./storage/${fileName}`
    this.count = 0
  }
  async createOrReset() {
    try {
      await fs.promises.writeFile(this.filename, '[]')
    } catch (error) {
      console.log(error)
    }
  }
  async save(product) {
    let products = []
    try {
      products = await fs.promises.readFile(this.filename, 'utf-8')
      products = JSON.parse(products)

      this.count = [...products].pop().id
    } catch (error) {
      try {
        await this.createOrReset()
      } catch (error) {
        console.error(error)
      }
    }
    const newProduct = {
      ...product,
      id: this.count + 1,
      timestamp: parseInt(Date.now()) / 100,
      uuid: uuidv4()
    }
    products.push(newProduct)

    const productsStr = JSON.stringify(products, null, 3)
    await fs.promises.writeFile(this.filename, productsStr)
    return new productDTO(newProduct)
  }
  async getAll() {
    try {
      const products = await fs.promises.readFile(this.filename, 'utf-8'),
        productsJson = await JSON.parse(products)
      if (productsJson.length > 0) {
        const productsDTO = productsJson.map(product => new productDTO(product))
        return productsDTO
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
    }
  }

  async getOne() {
    try {
      const data = await fs.promises.readFile(this.fileName, 'utf-8')
      const jsonData = await JSON.parse(data)
      if (jsonData.length > 0) {
        const random = parseInt(Math.random() * jsonData.length)
        return jsonData[random]
      } else {
        return null
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async putById(id, prop) {
    try {
      let data = await fs.promises.readFile(this.filename, 'utf-8')
      const jsonData = JSON.parse(data)
      let product = jsonData.find(pro => pro.id == id)
      //si existe lo modifico
      if (product) {
        product = {
          ...product,
          ...prop
        }
        data = jsonData.map(prod => {
          if (prod.id == product.id) {
            prod = product
          }
          return prod
        })
        const stringData = JSON.stringify(data, null, 3)
        //lo guardo en el archivo
        await fs.promises.writeFile(this.filename, stringData)
        return product
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
    }
  }

  async deleteById(num) {
    try {
      const data = await fs.promises.readFile(this.filename, 'utf-8'),
        jsonData = JSON.parse(data),
        id = parseInt(num)
      foundIndex = jsonData.findIndex(element => element.id === id)
      if (foundIndex !== -1) {
        jsonData.splice(foundIndex, 1)
        fs.writeFileSync(this.fileName, JSON.stringify(jsonData, null, 2))
        return num
      } else {
        console.log(`ID "${num}" not found`)
        return null
      }
    } catch (err) {
      throw new Error(err)
    }
  }
  deleteAll() {
    fs.writeFileSync(`./${this.filename}`, '[]')
  }
}
module.exports = ProductsContainer
