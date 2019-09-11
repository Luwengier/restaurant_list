const express = require('express')
const router = express.Router()
const Restr = require('../models/restaurant')

//--------- 路由 --------
//新增
router.get('/', (req, res) => {
  Restr.find((err, restrs) => {
    if (err) return console.error(err)
    return res.render('index', { restaurant: restrs })
  })
})

// 輸出路由
module.exports = router