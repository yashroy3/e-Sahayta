import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/Posts.js';

const app = express(); //initilize instance
dotenv.config();

//body parser is used as a middleware and cors is used to connect the middleware
app.use(bodyParser.json({limit : "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended: true}));
app.use(cors());

app.use('/posts',postRoutes) // localhost:5000/posts/

//using mongodb atlas

//copied this from mongodb atlas
//ath - const CONNECTION_URL = 'mongodb+srv://yash_roy:block_nemani123@cluster0.qsfck.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//roy - const CONNECTION_URL = 'mongodb+srv://yash_roy:block_nemani123@cluster0.nhvat.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => 
        app.listen(PORT,()=>console.log(`server running on port : ${PORT}`)))
    .catch((error) =>{
        console.log(error.message)
    })

mongoose.set('useFindAndModify',false);

//-------------------------------SERVER CONNECTION ESTABLISHED WITH DATABASE-------------------------------------------------