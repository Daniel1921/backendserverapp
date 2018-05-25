 var express = require('express');
 var app = express();
 var Paciente = require('../models/paciente');
 var bcrypt = require('bcryptjs');
 const { verificaToken, verificarAdmin_Role, verificarMedico } = require('../middlewares/autenticacion');

 // =========================================
 // Obtener todos los pacientes
 // =========================================


 app.get('/paciente', [verificaToken, verificarMedico], (req, res, next) => {

     Paciente.find({},
             'cedula nombres apellidos email  estatura peso ')
         .exec(
             (err, paciente) => {
                 if (err) {
                     return res.status(500).json({
                         ok: false,
                         mensaje: 'error en la bd',
                         errors: err
                     });
                 }
                 res.status(200).json({
                     ok: true,
                     pacientes: paciente
                 });
             });


 });

 // =========================================
 // crear un nuevo paciente
 // =========================================

 app.post('/paciente', [verificaToken, verificarMedico], (req, res) => {
     var body = req.body;
     var paciente = new Paciente({
         cedula: body.cedula,
         nombres: body.nombres,
         apellidos: body.apellidos,
         email: body.email,
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