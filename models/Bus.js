import { model, Schema } from "mongoose";

const busshcema=new Schema({
    busno:{
        type:"Number",
        required:true,
        unique:true 
    },
    busname:{
        type:"String"
    },
    seats:{
        type:"Number"
    }
},{
    timestamps:true
})
const Bus =model('Bus',busshcema)
export default Bus;