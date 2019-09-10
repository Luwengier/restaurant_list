const mongoose = require('mongoose')
const Restr = require('../restaurant')

const restaurantList = require('../../restaurant.json')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})
db.once('open', () => {
  console.log('db connected!')

  for (let i of restaurantList.results) {
    Restr.create({
      name: i.name,
      category: i.category,
      image: i.image,
      location: i.location,
      phone: i.phone,
      rating: i.rating,
      description: i.description
    })
  }

  console.log('done')
})


