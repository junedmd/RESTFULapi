import { model, Schema } from "mongoose";
const bookingschema=new Schema({
    name:{
        type:"String",
    },
    seats:{
        type:"Number",
        required:true
    },
    from:{
        type:"String",
        required:true
    },
    destination:{
        type:"String",
        required:true
    }
},{
    timestamps:true
})
const Booking=model('Booking',bookingschema)
export default Booking;