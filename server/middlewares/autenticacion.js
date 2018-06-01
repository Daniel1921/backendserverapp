const jwt = require('jsonwebtoken');



// =========================================
// verificar token 
// =========================================

let verificaToken = (req, res, next) => {

    let token = req.get('token');
    jwt.verify(token, 'este-es-el-seed-de-desarrollo', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    mensaje: 'token invalido'
                }
            })
        }

        req.usuario = decoded.usuario;
        next();
    });

};


// =========================================
// verificar rol si es admin
// =========================================

let verificarAdmin_Role = (req, res, next) => {





    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.status(400).json({
            ok: false,
            err: {
                mensaje: 'El usuario no es administrador'
            }
        })

    }


}

// =========================================
// verificar rol si es Paciente
// =========================================

let verificarPaciente = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'PACIENTE_ROLE') {
        next();
    } else {

        return res.status(400).json({
            ok: false,
            err: {
                mensaje: 'El usuario no es un paciente'
            }
        })

    }


}

// =========================================
// verificar rol si es Medico
// =========================================

let verificarMedico = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'MEDICO_ROLE') {
        next();
    } else {

        return res.status(400).json({
            ok: false,
            err: {
                mensaje: 'El usuario no es un medico'
            }
        })

    }


}

// =========================================
// verificar rol si es Medico o paciente
// =========================================

let verificarMedicoPaciente = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'MEDICO_ROLE' || usuario.role === 'PACIENTE_ROLE') {
        next();
    } else {

        return res.status(400).json({
            ok: false,
            err: {
                mensaje: 'El usuario no es un medico'
            }
        })

    }


}


module.exports = {

    verificaToken,
    verificarAdmin_Role,
    verificarPaciente,
    verificarMedico,
    verificarMedicoPaciente

}