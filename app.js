const fs = require('fs');
const express = require("express");

const app = express();

app.use(express.json())

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json','utf-8'));

const getAllTours =(req,res)=>{
        res.status(200).json({
            status:'succsess',
            results:tours.length,
            data:{
                tours
            }
        });
}
const createTour = (req,res)=>{
    // console.log(req.body)
    const newId = tours[tours.length -1].id + 1;
    const newTour = Object.assign({id:newId},req.body);
    tours.push(newTour)
    fs.writeFile(`./dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
       res.status(201).json({
           status:'success',
           data:{
               tour:newTour
           }
       })
    })
}

const getTour = (req,res)=>{
    console.log(req.body)
    const id = req.params.id*1;
    const tour = tours.find(el=>el.id === id)
    if(!tour){
        return res.status(404).json({
            status:"fail",
            message:"Invalid ID"
        })
    }
    res.status(200).json({
        status:"success",
        data:{
            tour
        }
    });
}

const updateTour = (req,res)=>{
    const id = req.params.id*1;
    const tour = tours.find(el=>el.id === id)
    if(!tour){
        return res.status(404).json({
            status:"fail",
            message:"Invalid ID"
        })
    }
    res.status(200).json({
        status:"success",
        data:{
            tour
        }
    })
}

const deleteTour = (req,res)=>{
    const id = req.params.id*1;
    const tour = tours.find(el=>el.id === id)
    if(!tour){
        return res.status(404).json({
            status:"fail",
            message:"Invalid ID"
        })
    }
    res.status(204).json({
        status:"success",
        data:null
    })
}

// app.get('/api/v1/tours',getAllTours)

// app.post('/api/v1/tours',createTour)

// app.get('/api/v1/tours/:id',getTour)

// app.patch('/api/v1/tours/:id',updateTour)

// app.delete('/api/v1/tours/:id',deleteTour)

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

app.listen(3000,()=>{
    console.log('Server started at port 3000')
})