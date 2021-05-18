const express= require('express');
const mongoose= require('mongoose');
const dotenv= require('dotenv');
const helmet= require('helmet');
const auth= require('./routes/auth');
const entry= require('./routes/entry');
const path= require('path');

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


//prepare to deploy
//Serve static asesets
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


//Running app on a server
const port= process.env.PORT || 9000;
app.listen(port, ()=>{
    console.log('Server started a port 9000');
});