// =========================================
// puerto
// =========================================

process.env.PORT = process.env.PORT || 3000;

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
    urlDB = 'mongodb://petroskyteam:123456petro@ds229690.mlab.com:29690/appmedicadb'
}

process.env.URLDB = urlDB;