// =========================================
// puerto
// =========================================

process.env.PORT = process.env.PORT || 3000;

// =========================================
// fecha de expiración de los tokens
// =========================================
// 60 segundos 
// 60 minutos
// 24 horas
// 30 días

// process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// =========================================
// Semilla de autentificación
// =========================================

// process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';

// =========================================
// entorno
// =========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =========================================
// base de datos
// =========================================

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/appmedicadb'
} else {
    urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB;