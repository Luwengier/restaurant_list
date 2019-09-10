// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

//connect to mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })
const Restr = require('./models/restaurant')
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})



//----------- routes setting ----------
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantOne = restaurantList.results.find(restr => restr.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurantOne: restaurantOne })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurantRes = restaurantList.results.filter(restr => {
    return restr.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurant: restaurantRes, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})

