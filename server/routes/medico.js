var express = require('express');
var app = express();
var Medico = require('../models/medico');
var bcrypt = require('bcryptjs');
const { verificaToken, verificarAdmin_Role, verificarMedico } = require('../middlewares/autenticacion');

// =========================================
// Obtener todos los medicos
// =========================================


app.get('/medico', [verificaToken, verificarAdmin_Role], (req, res, next) => {

    Medico.find({},
            'cedula nombres apellidos email  clinica  ')
        .exec(
            (err, medico) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error en la bd',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    medicos: medico
                });
            });


});

// =========================================
// crear un nuevo Medico
// =========================================

app.post('/medico', [verificaToken, verificarAdmin_Role], (req, res) => {
    var body = req.body;
    var medico = new Medico({
        cedula: body.cedula,
        nombres: body.nombres,
        apellidos: body.apellidos,
        email: body.email,
        clinica: body.clinica
    });

    medico.save((err, medicoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al crear un medico',
                err
            })
        }
        res.status(201).json({
            ok: true,
            medico: medicoGuardado
        })
    })

});



module.exports = app;