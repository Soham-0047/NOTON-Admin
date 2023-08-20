import express from 'express'

import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './mongodb/connect.js';

import userRouter from './routes/user.routes.js';

import propertyRouter from './routes/property.routes.js';


dotenv.config();

const app = express();


app.use(cors({origin:'*'}))

app.use(cors(
    {origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true}
));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


  app.options('/api/v1/users', cors());

  
app.use(express.json({limit:'50mb'}));

app.get('/', (req,res) =>{
    res.send({messgae:"Welcome"});
})


app.use('/api/v1/users',userRouter);

app.use('/api/v1/property',propertyRouter);

const startServer = async () =>{

    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8000, ()=> console.log('Server Started on http://localhost:8000'));
    } catch (error) {
        console.log(error)
    }
}
startServer();