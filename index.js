const express= require('express');
const mongoose= require('mongoose');
const dotenv= require('dotenv');
const helmet= require('helmet');
const auth= require('./routes/auth');
const entry= require('./routes/entry');

//dotenv config
dotenv.config();

//Creating a express app
const app= express();

//connecting to database
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  })
        .then(()=> console.log("Database Connected"))
        .catch(err=> console.log(err));
        
//middlewares
app.use(express.json());
app.use(helmet());
app.use('/api/auth', auth);
app.use('/api/entry', entry);


//Running app on a server
app.listen(9000, ()=>{
    console.log('Server started a port 9000');
});