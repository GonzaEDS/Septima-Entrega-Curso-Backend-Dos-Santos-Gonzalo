class ProductDTO {
  constructor(product) {
    this.name = product.name
    this.description = product.description
    this.price = product.price
    this.thumbnail = product.thumbnail
    this.timestamp = product.timestamp
    this.uuid = product.uuid
  }
  build() {
    return {
      name: this.name,
      description: this.description,
      price: this.price,
      thumbnail: this.thumbnail,
      timestamp: this.timestamp,
      uuid: this.uuid
    }
  }
}

module.exports = ProductDTO
