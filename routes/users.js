const router = require('express').Router();
const { db } = require('../models');
const models = require('../models')
const {Page}=require("../models");
const {User}=require("../models");
const index = require("../views/index");

router.get('/users/:id', async (req, res, next) => {
  const id = req.params.id;
  // try {
  //     const userData = await User.findByPk(id)
  //     const pageData = await Page.findByPk(userData.id)
  //     res.send(index.userPages(userData, pageData))
  //     // console.log(userdata.id)
  //     // console.log(pageData)
  // } catch (error) {
  //     next(error)
  // }
  const userData = await User.findByPk(id)
  const pageData = await Page.findAll({where:{authorId:id}})
  res.send(index.userPages(userData, pageData))


})


module.exports = router;
