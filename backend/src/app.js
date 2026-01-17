//create server
const express = require('express');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const foodRoutes  = require('./routes/food.routes')
const foodPartnerRoutes = require('./routes/food-partner.routes')
const cors = require('cors')
const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://food-app-zeta-swart.vercel.app",
    "https://food-app-git-main-sanjana-byte-hubs-projects.vercel.app/",
    "https://food-lsebpmu99-sanjana-byte-hubs-projects.vercel.app/",
  ],
  credentials: true
}));



app.use(express.urlencoded({ extended: true }));
app.get("/",(req,res)=>{
    res.send("hello app,js")
})

app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes);
app.use('/api/food-partner',foodPartnerRoutes);

module.exports = app;