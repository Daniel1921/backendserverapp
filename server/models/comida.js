var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')
var Schema = mongoose.Schema;

var comidaSchema = new Schema({

    hora: { type: String, required: [true, 'la hora es necesaria'] },
    comida: { type: String, required: [true, 'los alimentos son necesarios'] },
    img: { type: String }

});

//pacienteSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })

module.exports = mongoose.model('Comida', comidaSchema)