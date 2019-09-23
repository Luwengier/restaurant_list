const express = require('express')
const router = express.Router()
const Restr = require('../models/restaurant')

const { authenticated } = require('../config/auth')

//--------- 路由 --------
//新增頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})
//新增
router.post('/', authenticated, (req, res) => {
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
//詳細頁面
router.get('/:id', authenticated, (req, res) => {
  Restr.findOne({ _id: req.params.id, userId: req.user._id }, (err, restr) => {
    if (err) return console.error(err)
    return res.render('show', { restaurantOne: restr })
  })
})
//編輯頁面
router.get('/:id/edit', authenticated, (req, res) => {
  Restr.findOne({ _id: req.params.id, userId: req.user._id }, (err, restr) => {
    if (err) return console.error(err)
    return res.render('edit', { restr: restr })
  })
})
//編輯
router.put('/:id/edit', authenticated, (req, res) => {
  Restr.findOne({ _id: req.params.id, userId: req.user._id }, (err, restr) => {
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
//搜尋
router.get('/search', authenticated, (req, res) => {
  const keyword = req.query.keyword
  Restr.find((err, restrs) => {
    if (err) return console.error(err)
    const restaurantRes = restrs.filter(restr => {
      return restr.name.toLowerCase().includes(keyword.toLowerCase())
    })
    return res.render('index', { restaurant: restaurantRes, keyword: keyword })
  })
})
//刪除
router.delete('/:id/delete', authenticated, (req, res) => {
  Restr.findOne({ _id: req.params.id, userId: req.user._id }, (err, restr) => {
    if (err) return console.error(err)
    restr.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})
// 輸出路由
module.exports = router