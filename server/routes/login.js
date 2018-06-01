var bcrypt = require('bcryptjs');
var express = require('express');
var app = express();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');



app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ username: body.username }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(usuario) o contraseña incorrectos'
                }
            })
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario o (contraseña) incorrectos'
                }
            })
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, 'este-es-el-seed-de-desarrollo', { expiresIn: 60 * 60 * 24 * 30 });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });


    })

});



// se puede utilizar la configuración que se la hará al app en las otras paginas 
module.exports = app;