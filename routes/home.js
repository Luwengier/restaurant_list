const express = require('express')
const router = express.Router()
const Restr = require('../models/restaurant')

const { authenticated } = require('../config/auth')

//--------- 路由 --------
//新增
router.get('/', authenticated, (req, res) => {
  Restr.find({ userId: req.user._id })            // 只會列出登入使用者的 todo
    .sort({ name: 'asc' })
    .exec((err, restrs) => {
      if (err) return console.error(err)
      return res.render('index', { restaurant: restrs })
    })
})

// 輸出路由
module.exports = router