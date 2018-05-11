var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const colors = require('colors');
require('./config/config');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(require('./routes/paciente'));


mongoose.connection.openUri('mongodb://localhost:27017/appmedicadb', (err, res) => {
    console.log(`Inicio de base de datos`.yellow);
    if (err) throw err;
    console.log(`iniciado la base de datos exitosamente`.green)

})


//importar rutas 
//var appRoutes = require('./routes/app');
//var pacienteRoutes = require('./routes/paciente');

// rutas
/* app.use('/paciente', pacienteRoutes);
app.use('/', appRoutes); */

app.listen(process.env.PORT, () => {
    console.log(`expres server puerto 3000 http://localhost:${process.env.PORT} online`.blue)
});