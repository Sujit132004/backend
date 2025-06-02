const express=require('express');
const connectDB=require('./config/db');
const dotenv=require('dotenv');
const cors=require('cors');
const authRoute=require('./routes/authRoutes');
const stationRoute=require('./routes/StationRoutes');
dotenv.config();

const app=express();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoute);
app.use('/api/stations',stationRoute);
const PORT=process.env.PORT ||5000;
app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

app.listen(PORT,()=>{
    console.log(`Server started at PORT no: ${PORT}`);
});