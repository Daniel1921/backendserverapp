var express = require('express');
var app = express();
var Comida = require('../models/comida');
var bcrypt = require('bcryptjs');

// =========================================
// crear una nueva comida
// =========================================

app.post('/comida', (req, res) => {
    var body = req.body;
    var comida = new Comida({

        hora: body.hora,
        comida: body.comida,

        img: body.img

    });

    comida.save((err, comidaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al crear una comida',
                err
            })
        }
        res.status(201).json({
            ok: true,
            comida: comidaGuardado
        })
    })

});


// =========================================
// Obtener todos las comidas
// =========================================


app.get('/comida', (req, res, next) => {

    Comida.find({},
            'hora comida img')
        .exec(
            (err, comida) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error en la bd',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    comidas: comida
                });
            });


});


module.exports = app;