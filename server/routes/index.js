var express = require("express");
var app = express();

app.use(require('./paciente'));
app.use(require('./medico'));
app.use(require('./comida'));
app.use(require('./alimento'));
app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./upload'));


module.exports = app;