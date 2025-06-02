const express=require('express');
const router=express.Router();
const {getAllStations,createStation,updateStation,deleteStation}=require('../controllers/stationController')
const auth=require('../middleware/authMiddleware');

router.get('/',auth,getAllStations);
router.post('/',auth,createStation);
router.put('/:id',auth,updateStation);
router.delete('/:id',auth,deleteStation);

module.exports=router;