const mongoose = require('mongoose')
const Restr = require('../restaurant')
const User = require('../user')
const bcrypt = require('bcryptjs')

const restaurantList = require('./restaurant.json')
const restrList1 = restaurantList.results.slice(0, 3)
const restrList2 = restaurantList.results.slice(3, 6)

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})
db.once('open', () => {
  console.log('db connected!')



  User.create({
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  }).then(
    user => {
      for (let i of restrList1) {
        Restr.create({
          name: i.name,
          category: i.category,
          image: i.image,
          location: i.location,
          phone: i.phone,
          rating: i.rating,
          description: i.description,
          userId: user._id
        })
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err
          user.password = hash
          user.save()
            .catch(err => console.log(err))
        })
      })
    }
  )


  User.create({
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }).then(
    user => {
      for (let i of restrList2) {
        Restr.create({
          name: i.name,
          category: i.category,
          image: i.image,
          location: i.location,
          phone: i.phone,
          rating: i.rating,
          description: i.description,
          userId: user._id
        })
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err
          user.password = hash
          user.save()
            .catch(err => console.log(err))
        })
      })
    }
  )


  console.log('done')
})


