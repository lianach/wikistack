const router = require('express').Router();
const { db } = require('../models');
const models = require('../models')
const {Page}=require("../models");
const {User}=require("../models");
const index = require("../views/index");

// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })
// const init = async() => {
//     await models.db.sync({force: true})

// }
// //models.db.sync({force: true})
// init();
router.get('/add', (req, res, next) => {
    res.send(index.addPage())
})

router.get('/:slug', async(req, res, next) => {
    let slug=req.params.slug;
    try{
    const id= await Page.findOne({
        attributes:['authorId'],
        where:{slug:slug}
    });
    console.log(id.authorId)
    const foundSlug=await Page.findOne({
        where: { slug : slug}
    });
    res.send(index.wikiPage(foundSlug))
}catch(err){next(err)}

  });

router.get('/users', (req, res, next) => {

    res.send(index.userList())
})

router.get('/', async(req, res, next) => {
    // console.log(user)
    try{
        const allPages=await Page.findAll();
        const allUsers=await User.findAll();
        console.log(allUsers)
        res.send(index.userPages(allUsers,allPages));
    }catch(err){next(err)}

})
function getSlug(title){
    let r=/[^A-Za-z]/g;
    return title.replace(r,'_');
}
router.post('/', async(req, res, next) => {
    let author=req.body.name;
    let title=req.body.title;
    let email=req.body.email;
    let content=req.body.content;
    let status=req.body.status;

    Page.beforeValidate((userInstance, optionsObject) => {
        userInstance.slug=getSlug(title);
      })

    const [user,wasCreated]=await User.findOrCreate({where:{name:author,email:email}});
    const page=await Page.create({
        title:title,
        content:content
    });
    //console.log(page.getUser());
    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);

    //console.log(user);
})
module.exports = router;

