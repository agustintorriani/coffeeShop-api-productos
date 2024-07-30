const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var bluebird = require('bluebird');
const mongoose = require('mongoose');

const app = express();

var indexRouter = require('./src/routes/index');
var apiRouter = require('./src/routes/api'); //Custom

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Definición de rutas
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Utilización de rutas
app.use('/api', apiRouter);
app.use('/', indexRouter);

require('./config').config();

//Database connection --
mongoose.Promise = bluebird;
let url = `${process.env.DATABASE1}${process.env.DATABASE2}=${process.env.DATABASE3}=${process.env.DATABASE4}`
let opts = {
  connectTimeoutMS:20000, 
  };

mongoose.connect(url,opts)
  .then(() => {
    console.log(`La conexión a la base de mongoDB fue exitosa..`)
  })
  .catch((e) => {
    console.log(`Error en la conexión a la base de mongoDB...`),
    console.log(e)
  })


// Puerto de escucha
var port = process.env.PORT || 4002;
// Escuchar en el puerto
app.listen(port,()=>{
    console.log('API iniciada en el puerto ',port);
});