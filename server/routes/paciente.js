 var express = require('express');
 var app = express();
 var Paciente = require('../models/paciente');
 var bcrypt = require('bcryptjs');

 // =========================================
 // crear un nuevo paciente
 // =========================================

 app.post('/paciente', (req, res) => {
     var body = req.body;
     var paciente = new Paciente({
         cedula: body.cedula,
         nombres: body.nombres,
         apellidos: body.apellidos,
         email: body.email,
         password: body.password,
         estatura: body.estatura,
         peso: body.peso
     });

     paciente.save((err, pacienteGuardado) => {
         if (err) {
             return res.status(400).json({
                 ok: false,
                 mensaje: 'error al crear un paciente',
                 err
             })
         }
         res.status(201).json({
             ok: true,
             paciente: pacienteGuardado
         })
     })

 });



 module.exports = app;