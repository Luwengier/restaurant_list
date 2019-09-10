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

// 設定 bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

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
  Restr.find((err, restrs) => {
    if (err) return console.error(err)
    return res.render('index', { restaurant: restrs })
  })
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const restr = new Restr({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    rating: req.body.rating,
    description: req.body.description
  })

  restr.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

app.get('/restaurants/:id', (req, res) => {
  Restr.findById(req.params.id, (err, restr) => {
    if (err) return console.error(err)
    return res.render('show', { restaurantOne: restr })
  })
})

app.get('/restaurants/:id/edit', (req, res) => {
  Restr.findById(req.params.id, (err, restr) => {
    if (err) return console.error(err)
    return res.render('edit', { restr: restr })
  })
})

app.post('/restaurants/:id/edit', (req, res) => {
  Restr.findById(req.params.id, (err, restr) => {
    if (err) return console.error(err)
    restr.name = req.body.name
    restr.category = req.body.category
    restr.image = req.body.image
    restr.location = req.body.location
    restr.phone = req.body.phone
    restr.rating = req.body.rating
    restr.description = req.body.description
    restr.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})



app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restr.find((err, restrs) => {
    if (err) return console.error(err)
    const restaurantRes = restrs.filter(restr => {
      return restr.name.toLowerCase().includes(keyword.toLowerCase())
    })
    return res.render('index', { restaurant: restaurantRes, keyword: keyword })
  })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})

