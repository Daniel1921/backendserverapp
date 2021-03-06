var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')
var Schema = mongoose.Schema;
var Usuario = require('./usuario');

var pacienteSchema = new Schema({
    cedula: { type: String, unique: true, required: [true, 'la cedula es necesaria'] },
    nombres: { type: String, required: [true, 'el nombre es necesario'] },
    apellidos: { type: String, required: [true, 'los apellidos son necesarios'] },
    email: { type: String, unique: true, required: [true, 'el email es necesario'] },
    estatura: { type: Number, required: [true, 'la estatura es necesaria'] },
    peso: { type: Number, required: [true, 'el peso es necesario'] },
    usuario: { type: Schema.ObjectId, unique: true, ref: "Usuario" }
});




pacienteSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })
module.exports = mongoose.model('Paciente', pacienteSchema)