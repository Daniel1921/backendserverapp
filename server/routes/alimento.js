var express = require('express');
var app = express();
var Alimento = require('../models/alimento');
var bcrypt = require('bcryptjs');
const { verificaToken, verificarAdmin_Role, verificarPaciente, verificarMedicoPaciente } = require('../middlewares/autenticacion');

// =========================================
// crear una nueva comida
// =========================================

app.post('/alimento', [verificaToken], (req, res) => {
    var body = req.body;
    var alimento = new Alimento({

        nombre: body.nombre

    });

    alimento.save((err, alimentoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al crear un alimento',
                err
            })
        }
        res.status(201).json({
            ok: true,
            alimento: alimentoGuardado
        })
    })

});


// =========================================
// Obtener todos las comidas
// =========================================


app.get('/alimento', [verificaToken], (req, res, next) => {

    Alimento.find({},
            'nombre')
        .exec(
            (err, alimento) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error en la bd',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    alimentos: alimento
                });
            });


});


module.exports = app;