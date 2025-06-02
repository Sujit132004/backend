const ChargingStation=require('../models/ChargingStation');

exports.getAllStations=async(req,res)=>{
    const stations=await ChargingStation.find();
    return res.json(stations);
};

exports.createStation=async(req,res)=>{
    const newStation=new ChargingStation({
        ...req.body,user:req.user.id
});
    await newStation.save();

    return res.status(201).json({
        newStation
    });
}

exports.updateStation=async(req,res)=>{
    const station=await ChargingStation.findByIdAndUpdate(req.params.id,req.body,{new:true});

    return res.status(201).json({
        station
    });
}

exports.deleteStation=async(req,res)=>{
    await ChargingStation.findByIdAndDelete(req.params.id);
    return res.json({message:"Deleted Successfully!"});
}