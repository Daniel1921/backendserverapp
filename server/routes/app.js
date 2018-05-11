var express = require("express");
var app = express();

//rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: "se ha realizado correctamente la petición"
    })
});
module.exports = app;