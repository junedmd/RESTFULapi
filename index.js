import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import Booking from "./models/Booking.js";
import Bus from "./models/Bus.js";

const app= express();
app.use(express.json());

 const PORT=5000;

const connectMongoDB = async()=>{
    const conn= await mongoose.connect(process.env.MONGO_URI);

    if(conn){
        console.log("api is working")
    }
};
connectMongoDB();


// Booking model

app.post("/api/bookings",async(req , res)=>{
    const { name,seats, from ,destination }=re.body;
    const booking = new Booking({name, seats,from ,destination })
    try{
        const savedbooking= await booking.save()
       return res.status(201).json({
        success:true,
        data:savedbooking,  
        message:'customer booking  successfully added '
    })
    }
    catch(err){
     return res.json({
            success:false,
            message:err.message
        })
    }

})

app.get("/api/bookings",async(req,res)=>{
    const completebookings=await Booking.find()
   return res.status(200).json({
        success:true,
        data:completebookings,
        message:"all bookings found successfully"
    })
})

app.get('/api/bookings/:id',async (req,res)=>{
    const {id}=req.params
    const specificbooking = await Booking.findOne({_id:id})
    res.json({
       success : true,
       data : specificbooking,
       message : "specific booking!"
    })
 
 })

app.put("/api/bookings/:id", async (req,res)=>{
    const {id}=req.params
    const { name,seats, from ,destination}=req.body;
   await Booking.updateOne({id:id} , {$set:{
    name:name,seats:seats, from:from ,destination:destination
   }})
    
    const updatedbooking=await Booking.findOne({id:id})
    return res.status(201).json({
        success:true,
        data:updatedbooking,
        message:"tickets updated successfully"
    })
    
})
app.patch("/api/bookings/:id", async (req,res)=>{
    const {id}=req.params
    const {seats}=req.body;
   await Booking.updateOne({id:id} , {$set:{
     seats:seats
   }})
    
    const updatedbooking=await Booking.findOne({id:id})
    return res.status(201).json({
        success:true,
        data:updatedbooking,
        message:"data updated successfully"
    })
    
})

app.delete("/api/bookings/:id", async(req,res)=>{
    const {id}=req.params
    await Booking.deleteOne({id:id})
  return  res.status(204).json({
        success:true,
          message:"data deleted successfully"
    })


})

// BUS MODEL

app.post("/api/buses",async(req , res)=>{
    const { busno,busname ,seats}=req.body;
    const bus=new Bus({ busno,busname,seats})
    try{
        const savedbus= await bus.save()
       return res.status(201).json({
        success:true,
        data:savedbus,  
        message:'bus data post successfully'
    })
    }
    catch(err){
     return res.json({
            success:false,
            message:err.message
        })
    }


});


app.get("/api/buses",async(req,res)=>{
    const allbuses=await Bus.find()
   return res.status(200).json({
        success:true,
        data:allbuses,
        message:"all buses found successfully"
    })
});

app.get("/api/buses/:id" ,async(req,res)=>{
    const {id}=req.params;
    const data = await Product.findOne({_id:id})
       
        res.send({
            name:true,
            data:data,
            message:`successfully data found by id ${id}`
        })

})

app.put("/api/buses/:id", async (req,res)=>{
    const {id}=req.params
    const { busno,busname,seats}=req.body;
   await Bus.updateOne({_id:id} , {$set:{
    busno:busno, busname:busname,seats:seats
   }})
    
    const updatedbus=await Bus.findOne({_id:id})
    return res.status(201).json({
        success:true,
        data:updatedbus,
        message:"data updated successfully"
    })
    
})
 
app.patch("/api/buses/:id", async (req,res)=>{
    const {id}=req.params
    const {seats}=req.body;
   await Bus.updateOne({_id:id} , {$set:{
     seats:seats 
   }})
    
    const updatedbus=await Bus.findOne({_id:id})
    return res.status(201).json({
        success:true,
        data:updatedbus,
        message:"data updated successfully"
    })
})
 
app.delete("/api/buses/:id", async(req,res)=>{
    const {id}=req.params
    await Bus.deleteOne({_id:id})
  return  res.status(204).json({
        success:true,
        message:"data deleted successfully"
    })
})
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
}) 