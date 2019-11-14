const express = require('express');
const morgan = require('morgan');
const router = require('./routes/index')


const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname));
app.use(express.urlencoded({extended: false}));
app.use('/wiki', router)

const PORT = 3000;



app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
})