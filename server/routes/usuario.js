var express = require('express');
var app = express();
const Usuario = require('../models/usuario');
var bcrypt = require('bcryptjs');
var _ = require('underscore');

// los middlewares se ponen como segundo de argumento de una función express.
const { verificaToken, verificarAdmin_Role } = require('../middlewares/autenticacion');

// [verificaToken], 
app.get('/usuario', function(req, res) {



    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuario.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                usuarios
            })

        })


});

//[verificaToken, verificarAdmin_Role],

app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({

        username: body.username,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        img: body.img
    });

    usuario.save((e, usuarioDB) => {
        if (e) {
            return res.status(400).json({
                ok: false,
                e
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });



});

app.put('/usuario/:id', [verificaToken, verificarAdmin_Role], function(req, res) {

    let id = req.params.id;

    let body = _.pick(req.body, [
        'username',
        'img',
        'role',
        'estado'
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