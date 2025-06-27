const { app, BrowserWindow, ipcMain } = require('electron');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db;

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: true,
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'dist/sci/browser/index.html'));
    //mainWindow.setMenu(null); // Esta linea es para deshabilitar el inspeccionar , osea , la consola y eso de la web

    // Inicializar base de datos
   //const dbPath = path.join(__dirname, 'database.db');
    const dbPath = path.join(app.getPath('userData'), 'database.db');
    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Conectado a la base de datos SQLite.');
    });

    
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

    // Crear la tabla
    db.run(`CREATE TABLE IF NOT EXISTS usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        cedula INTEGER NOT NULL,
        correo TEXT NOT NULL ,
        usuario TEXT NOT NULL UNIQUE,
        contrasena TEXT NOT NULL,
        rol Integer NOT NULL
    )`);

    // Crear la tabla Persona
    db.run(`CREATE TABLE IF NOT EXISTS persona (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        tlf TEXT,
        fechaNac DATE,
        sexo TEXT NOT NULL ,
        email TEXT ,
        ci INTEGER
    )`);

    // Crear la tabla
    db.run(`CREATE TABLE IF NOT EXISTS docente (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        docente INTEGER,
        carga_acad INTEGER,
        trayecto INTEGER ,
        estado INTEGER ,
        profesion TEXT ,
        FOREIGN KEY (trayecto) REFERENCES trayecto(id),
        FOREIGN KEY (docente) REFERENCES persona(id),
        FOREIGN KEY (estado) REFERENCES status(id)
    )`);
    // Crear la tabla
    db.run(`CREATE TABLE IF NOT EXISTS status (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT 
        
    )`);
    // Crear la tabla
    db.run(`CREATE TABLE IF NOT EXISTS trayecto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT   
    )`);
    // Crear la tabla
    db.run(`CREATE TABLE IF NOT EXISTS sede (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT 
        
    )`);
    // Crear la tabla
    db.run(`CREATE TABLE IF NOT EXISTS rela_sede (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sede INTEGER ,
        docente INTEGER ,
        FOREIGN KEY (sede) REFERENCES sede(id),
        FOREIGN KEY (docente) REFERENCES persona(id)
    )`);
    
});


ipcMain.on('login', (event, user, pass) => {
    db.all(`SELECT * FROM usuario WHERE usuario =  ? AND  contrasena = ?`, [user, pass], (err, rows) => {
        if (err) {
            event.reply('login_valid', { error: err.message });
        } else {
            console.log('login_valid');
            event.reply('login_valid', { success: true, rows });
        }
    });
});

//Rol del usuario:
ipcMain.on('obtener-rol', (event, user) => {
    db.get(`SELECT rol FROM usuario WHERE usuario = ?`, [user], (err, row) => {
        if (err) {
            console.error(err.message);
            event.reply('rol-obtenido', { error: err.message });
        } else {
            event.reply('rol-obtenido', { error: null, rol: row ? row.rol : null });
        }
    });
});
// Manejar la inserción de usuarios
ipcMain.on('insertar-usuario', (event, nombre,apellido,ci, email, user, password, rol) => {
    console.log('insertar-usuario', nombre,apellido,ci, email, user, password, rol)
    db.run(`INSERT INTO usuario (nombre,apellido,cedula, correo, usuario, contrasena, rol) VALUES (?, ?, ?, ?,?, ?,?)`, [nombre,apellido,ci, email, user, password, rol], function(err) {
        if (err) {
            event.reply('usuario-insertado', { error: err.message });
        } else {
            event.reply('usuario-insertado', { id: this.lastID });
        }
    });
});

// Manejar la consulta de usuarios
ipcMain.on('consultar-usuarios', (event) => {
    db.all(`SELECT * FROM usuario`, [], (err, rows) => {
        if (err) {
            event.reply('usuarios-consultados', { error: err.message });
        } else {
            console.log('usuarios-consultados', rows);
            event.reply('usuarios-consultados', { usuarios: rows });
        }
    });
});
// Buscar usuario por username
ipcMain.on('buscar-user', (event, user) => {
    db.all(`SELECT * FROM usuario WHERE usuario =  ?`, [user], (err, rows) => {
        if (err) {
            event.reply('usuario-buscado', { error: err.message });
        } else {
            console.log('usuario-buscado');
            event.reply('usuario-buscado', { success: true, rows });
        }
    });
});

// Manejar la inserción de persona
ipcMain.on('insertar-persona', (event, nombre,apellido,ci, email, tlf, fechaNac, sexo) => {
    console.log('insertar-persona', nombre,apellido,ci, email, tlf, fechaNac, sexo)
    db.run(`INSERT INTO persona (nombre,apellido,ci, email,tlf, fechaNac, sexo) 
        VALUES (?, ?, ?, ?,?,?,?)`, 
        [nombre,apellido,ci, email,tlf, fechaNac, sexo], function(err) {
        if (err) {
            event.reply('persona-insertado', { error: err.message });
        } else {
            event.reply('persona-insertado', { id: this.lastID });
        }
    });
});

// Manejar la consulta de usuarios
ipcMain.on('consultar-persona', (event) => {
    db.all(`SELECT * FROM persona`, [], (err, rows) => {
        if (err) {
            event.reply('persona-consultados', { error: err.message });
        } else {
            console.log('persona-consultados', rows);
            event.reply('persona-consultados', { persona: rows });
        }
    });
});
