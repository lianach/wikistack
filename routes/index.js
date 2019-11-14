const router = require('express').Router();
const { db } = require('../models');
const models = require('../models')
const {Page}=require("../models");
const {User}=require("../models");
const index = require("../views/index");

router.get('/users/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const userData = await User.findByPk(id)
        const pageData = await Page.findByPk(userData.id)
        res.send(index.userPages(userData, pageData))
        // console.log(userdata.id)
        // console.log(pageData)
    } catch (error) {
        next(error)
    }
    console.log(id)
    
    
})

router.get('/add', (req, res, next) => {
    res.send(index.addPage())
})

router.get('/users', async (req, res, next) => {
    try {
        const users = await User.findAll();
        console.log(users)
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
        console.log(foundId.authorId)
        const foundName = await User.findByPk(foundId.authorId)
        console.log(foundName)
        const foundSlug=await Page.findOne({
            where: { slug : slug}
    });
        res.send(index.wikiPage(foundSlug, foundName))
    }catch(err){next(err)}

    });



router.get('/', async(req, res, next) => {
    // console.log(user)
    try{
        const allPages=await Page.findAll();
        const allUsers=await User.findAll();
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

