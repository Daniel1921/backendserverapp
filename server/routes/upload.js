var express = require('express');

var fileUpload = require('express-fileupload');
var fs = require('fs');


var app = express();

var Comida = require('../models/comida');



// default options
app.use(fileUpload());




app.put('/comida/imagen/:id', (req, res, next) => {


    var id = req.params.id;



    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            errors: { message: 'Debe de seleccionar una imagen' }
        });
    }

    // Obtener nombre del archivo
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Sólo estas extensiones aceptamos
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no válida',
            errors: { message: 'Las extensiones válidas son ' + extensionesValidas.join(', ') }
        });
    }

    // Nombre de archivo personalizado
    // 12312312312-123.png
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extensionArchivo }`;


    // Mover el archivo del temporal a un path
    var path = `./server/uploads/comidas/${ nombreArchivo }`;

    archivo.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }


        subirPorTipo(id, nombreArchivo, res);

        // res.status(200).json({
        //     ok: true,
        //     mensaje: 'Archivo movido',
        //     extensionArchivo: extensionArchivo
        // });


    })



});



function subirPorTipo(id, nombreArchivo, res) {



    Comida.findById(id, (err, comida) => {

        if (!comida) {
            return res.status(400).json({
                ok: true,
                mensaje: 'no existe',
                errors: { message: 'no existe' }
            });
        }


        var pathViejo = './uploads/comidas' + comida.img;

        // Si existe, elimina la imagen anterior
        if (fs.existsSync(pathViejo)) {
            fs.unlink(pathViejo);
        }

        comida.img = nombreArchivo;

        comida.save((err, comidaActualizado) => {



            return res.status(200).json({
                ok: true,
                mensaje: 'Imagen de comida actualizada',
                comida: comidaActualizado
            });

        })


    });

}



module.exports = app;