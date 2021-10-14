const fs = require('fs');
const { use } = require('../routes/tour-router');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`,'utf-8'));

exports.checkID = ((req,res,next,val)=>{
    const id = req.params.id * 1 > tours.length;
    const tour = tours.find(el=>el.id === id)
    if(!tour){
        return res.status(404).json({
            status:"fail",
            message:"Invalid ID"
        })
    }
    next();
})

exports.getAllTours =(req,res)=>{
    res.status(200).json({
        status:'succsess',
        results:tours.length,
        data:{
            tours
        }
    });
}

exports.createTour = (req,res)=>{
    // console.log(req.body)
    const newId = tours[tours.length -1].id + 1;
    const newTour = Object.assign({id:newId},req.body);
    tours.push(newTour)
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
    res.status(201).json({
        status:'success',
        data:{
            tour:newTour
        }
    })
    })
}

exports.getTour = (req,res)=>{
    console.log(req.body)
    res.status(200).json({
        status:"success",
        data:{
            tour
        }
    });
}

exports.updateTour = (req,res)=>{
    res.status(200).json({
        status:"success",
        data:{
            tour
        }
    })
}

exports.deleteTour = (req,res)=>{
    res.status(204).json({
        status:"success",
        data:null
    })
}


