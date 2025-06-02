const mongoose=require('mongoose');

const ChargingStationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        latitude:Number,
        longitude:Number
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        default:'Active',
    },
    powerOutput:Number,
    connectorType:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports=mongoose.model("ChargingStation",ChargingStationSchema);