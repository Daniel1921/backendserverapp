var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')
var Schema = mongoose.Schema;

var alimentoSchema = new Schema({

    nombre: { type: String, required: [true, 'El alimento es necesario'] },

});

//pacienteSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })

module.exports = mongoose.model('Alimento', alimentoSchema)