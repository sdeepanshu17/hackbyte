require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes')
const transferRoutes = require('./routes/transferRoutes')
const app = express()

connectDB()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.get('/',(req,res)=>res.send('API Running'));

// app.use('/api/users',require('./routes/api/users'));
// app.use('/api/group',)
// app.get('/test',(req,res)=>{
//     throw new Error('Error')
// })

app.use('/api/users',userRoutes)
app.use('/api/expense',transferRoutes)


app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})