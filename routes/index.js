const router = require('express').Router();
const { db } = require('../models');
const models = require('../models')

// const page = new pageRoute();
// const user = new userRoute();
const index = require("../views/index");

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const init = async() => {
    await models.db.sync()
    
}

models.db.sync({force: true})

init();

router.get('/add', (req, res, next) => {
    res.send(index.addPage())
})

router.get('/users', (req, res, next) => {
    res.send(index.userList())
})

router.get('/', (req, res, next) => {
    // console.log(user)
    res.send(index.main())
})

router.post('/', (req, res, next) => {
    console.log(req.body)
    res.redirect("/wiki")
})







module.exports = router;

