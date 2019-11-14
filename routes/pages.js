const router = require('express').Router();
const { db } = require('../models');
const models = require('../models')
const {Page}=require("../models");
const {User}=require("../models");
const index = require("../views/index");



router.get('/add', (req, res, next) => {
    res.send(index.addPage())
})

router.get('/users', async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.send(index.userList(users))
    } catch (error) {
        next(error)
    }

})

router.get('/:slug', async(req, res, next) => {
    let slug=req.params.slug;
    try{
        const foundId = await Page.findOne({
            attributes: ['authorId'],
            where: {slug : slug}

        })
        const foundName = await User.findByPk(foundId.authorId)
        const foundSlug=await Page.findOne({
            where: { slug : slug}
    });
        res.send(index.wikiPage(foundSlug, foundName))
    }catch(err){next(err)}

    });



router.get('/', async(req, res, next) => {
    try {
        const pages = await Page.findAll();
        res.send(index.main(pages))
    } catch (error) {
        next(error)
    }

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
