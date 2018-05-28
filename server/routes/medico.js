var express = require('express');
var app = express();
var Medico = require('../models/medico');
// var bcrypt = require('bcryptjs');
var _ = require('underscore');
const { verificaToken, verificarAdmin_Role, verificarMedico } = require('../middlewares/autenticacion');


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

// =========================================
// retorna los medicos paginados 
// =========================================

app.get('/medico', function(req, res) {



    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Medico.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, medicos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                medicos
            })

        })


});

// =========================================
// actualiza un medico
// =========================================

app.put('/medico/:cedula', [verificaToken, verificarAdmin_Role], function(req, res) {

    let id = req.params.id;

    let body = _.pick(req.body, ['clinica',
        'nombres',
        'apellidos',
        'email'
    ]);




    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })




});

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    res.json({
        ok: true,

    });
});




module.exports = app;