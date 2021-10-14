
const express = require("express");
const morgan = require('morgan');
const tourRouter = require('./routes/tour-router')
const userRouter = require('./routes/user-router')

const app = express();

//Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use((req,res,next)=>{
    console.log('Hellow from server');
    next();
})

//Routes
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

module.exports = app;