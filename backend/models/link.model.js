
import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    hash:{
        type:String,
        requred:true,
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        requred:true,
    }

});


const linkModel = mongoose.model("Link",linkSchema);

export default linkModel;