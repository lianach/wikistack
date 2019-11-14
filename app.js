const express = require('express');
const morgan = require('morgan');
const pagesRoute = require('./routes/pages')
 const usersRoute = require('./routes/users')
const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname));
app.use(express.urlencoded({extended: false}));
const { db } = require('./models');
const models = require('./models')
app.use('/wiki', pagesRoute);
app.use('/', usersRoute);
const PORT = 3000;

app.get("/",(req,res,next)=>{
    res.redirect("/wiki");
})
db.authenticate().
then(() => {
  console.log('connected to the database');
})
const init = async() => {
    await models.db.sync({force: true})
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}/`);
    })
}

init();

