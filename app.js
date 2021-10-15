
const express = require("express");
const morgan = require('morgan');
const tourRouter = require('./routes/tour-router')
const userRouter = require('./routes/user-router')

const app = express();

//Middlewares
console.log(process.env.NODE_ENV);

app.use(express.static('./public'))
app.use(express.json())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
    console.log('Am using morgan here now')
}

app.use((req,res,next)=>{
    console.log('Hellow from server');
    next();
})

//Routes
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

module.exports = app;