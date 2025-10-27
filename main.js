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
            //nodeIntegration: false,
            nodeIntegration: true,
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'dist/sci/browser/index.html'));
    //mainWindow.setMenu(null); // Esta linea es para deshabilitar el inspeccionar , osea , la consola y eso de la web

    // Inicializar base de datos
    //const dbPath = path.join(__dirname, 'database.db');// forma local
    //const dbPath = path.join(app.getPath('userData'), 'database.db');
    const dbPath = path.join(process.resourcesPath, 'database.db');//para geenrar el ejecutable
    /*const ffmpegPath = path.join(process.resourcesPath, 'ffmpeg.dll');
    if (!fs.existsSync(ffmpegPath)) {
        console.error('❌ ffmpeg.dll no encontrado en:', ffmpegPath);
    } else {
    console.log('✅ ffmpeg.dll cargado desde:', ffmpegPath);
    }*/
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
        
        tlf TEXT,
        fechaNac DATE,
        sexo TEXT  ,
        email TEXT ,
        ci INTEGER
    )`);

    // Crear la tabla
    db.run(`CREATE TABLE IF NOT EXISTS docente (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        docente INTEGER,
        carga_acad INTEGER,
        trayecto INTEGER ,
        sede INTEGER ,
        estado INTEGER ,
        profesion TEXT ,
        carga_resp TEXT ,
        observ TEXT ,
        compo_docent INTEGER ,
        modalidad INTEGER ,
        docent_boolean INTEGER ,
        estructura_bool INTEGER ,
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

    
    // Crear la tabla
    db.run(`CREATE TABLE IF NOT EXISTS pnf (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT 
        
    )`);

        // Crear la tabla
    db.run(`CREATE TABLE IF NOT EXISTS rela_pnf (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pnf INTEGER ,
        docente INTEGER ,
        FOREIGN KEY (pnf) REFERENCES pnf(id),
        FOREIGN KEY (docente) REFERENCES persona(id)
    )`);

        // Crear la tabla para la 
    db.run(`CREATE TABLE IF NOT EXISTS imagen (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        docente INTEGER ,
        nombre_imagen TEXT,
        tipo_mime TEXT,
        imagen_data TEXT,
        FOREIGN KEY (docente) REFERENCES docente(id)
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
    db.run(`INSERT INTO usuario (nombre,apellido,cedula, correo, usuario, contrasena, rol) VALUES (?, ?, ?, ?,?, ?,?)`, [nombre,apellido,ci, email, user, password, 1], function(err) {
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
ipcMain.on('actualizar-usuario', (event, { id, nombre, apellido,ci, email,user, password, rol }) => {
    console.log('Actualizando usuario con ID:', id,nombre, apellido,ci, email,user, password, rol);
    db.run(`UPDATE usuario SET nombre = ?, apellido = ?, cedula = ?, correo = ?,usuario = ?, contrasena = ?, rol = ? WHERE id = ?`, 
        [nombre, apellido,ci, email,user, password, 1, id], function(err) {
        if (err) {
            event.reply('usuario-actualizado', { error: err.message });
        } else {
            event.reply('usuario-actualizado', { success: true, id, nombre, email });
        }
    });
});


// Manejar la inserción de persona
ipcMain.on('insertar-persona', (event, nombre,ci, email, tlf, fechaNac, sexo) => {
    console.log('insertar-persona', nombre,ci, email, tlf, fechaNac, sexo)
    db.run(`INSERT INTO persona (nombre,ci, email,tlf, fechaNac, sexo) 
        VALUES (?, ?, ?,?,?,?)`, 
        [nombre,ci, email,tlf, fechaNac, sexo], function(err) {
        if (err) {
            event.reply('persona-insertado', { error: err.message });
        } else {
            event.reply('persona-insertado', { idd: this.lastID });
        }
    });
});


// Manejar la consulta de personas
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

/*
ipcMain.on('actualizar-persona', (event, {id,nombre,apellido,ci, email, tlf, fechaNac, sexo }) => {
    db.run(`UPDATE persona SET nombre = ?, apellido = ? WHERE id = ?`, 
        [nombre, apellido, 12], function(err) {
        if (err) {
            event.reply('persona-actualizado', { error: err.message });
        } else {
            event.reply('persona-actualizado', { success: true, id, nombre, email });
        }
    });
});*/
// Manejar la actualización de entidades
ipcMain.on('actualizar-persona', (event, {
    id,nombre,apellido,ci, email, tlf, fechaNac, sexo
}) => {
    console.log('Actualizando persona con ID:', id);
    db.run(`UPDATE persona SET
        nombre = ?,
        ci = ?,
        email = ?,
        tlf = ?,
        fechaNac = ?,
        sexo = ?
        WHERE id = ?`,
        [nombre,ci, email, tlf, fechaNac, sexo,id ], function(err) {
            if (err) {
                console.error('Error al actualizar persona:', err.message);
                event.reply('persona-actualizada', { error: err.message });
            } else {
                console.log('persona actualizada con éxito:', this.changes);
                event.reply('persona-actualizada', { idd: true, id });
            }
        }
    );
});

//pnf

ipcMain.on('consultar-pnf', (event) => {
    db.all(`SELECT * FROM pnf`, [], (err, rows) => {
        if (err) {
            event.reply('pnf-consultados', { error: err.message });
        } else {
            console.log('pnf-consultados', rows);
            event.reply('pnf-consultados', { pnf: rows });
        }
    });
});

ipcMain.on('actualizar-pnf', (event, {id,nombre }) => {
    console.log('Actualizando pnf con ID:', id);
    db.run(`UPDATE pnf SET
        name = ?
        WHERE id = ?`,
        [nombre, id ], function(err) {
            if (err) {
                console.error('Error al actualizar pnf:', err.message);
                event.reply('pnf-actualizada', { error: err.message });
            } else {
                console.log('pnf actualizada con éxito:', this.changes);
                event.reply('pnf-actualizada', { idd: true, id });
            }
        }
    );
});

ipcMain.on('insertar-pnf', (event, nombre) => {
    console.log('insertar-pnf', nombre)
    db.run(`INSERT INTO pnf (name) 
        VALUES (?)`, 
        [nombre], function(err) {
        if (err) {
            event.reply('pnf-insertado', { error: err.message });
        } else {
            event.reply('pnf-insertado', { idd: this.lastID });
        }
    });
});



ipcMain.on('eliminar-pnf', (event, id) => {
    db.run(`DELETE FROM pnf WHERE id = ?`, [id], function(err) {
        if (err) {
            event.reply('pnf-eliminado', { error: err.message });
        } else {
            event.reply('pnf-eliminado', { success: true, id });
        }
    });
});
ipcMain.on('eliminar-docente', (event, id) => {
    db.run(`DELETE FROM docente WHERE id = ?`, [id], function(err) {
        if (err) {
            event.reply('docente-eliminado', { error: err.message });
        } else {
            event.reply('docente-eliminado', { success: true, id });
        }
    });
});
ipcMain.on('eliminar-persona', (event, id) => {
    db.run(`DELETE FROM persona WHERE id = ?`, [id], function(err) {
        if (err) {
            event.reply('persona-eliminado', { error: err.message });
        } else {
            event.reply('persona-eliminado', { success: true, id });
        }
    });
});
ipcMain.on('eliminar-img', (event, id) => {
    db.run(`DELETE FROM imagen WHERE docente = ?`, [id], function(err) {
        if (err) {
            event.reply('img-eliminado', { error: err.message });
        } else {
            event.reply('img-eliminado', { success: true, id });
        }
    });
});

ipcMain.on('insert-image', (event,value_,filetype, filename, docente) => {
    //console.log('insert-image init',value_,filetype, filename, docente)
    console.log('end insert-image')
    db.run(`INSERT INTO imagen (imagen_data,tipo_mime,nombre_imagen, docente) 
        VALUES (?, ?, ?, ?)`, 
        [value_,filetype,filename, docente], function(err) {
        if (err) {
            event.reply('imagen-insertado', { error: err.message });
        } else {
            event.reply('imagen-insertado', { idd: this.lastID });
        }
    });
});


/*
// Manejador para insertar una imagen
ipcMain.on('insert-image', async (event, { filePath, imageName, mimeType, docente }) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error('Error al leer el archivo:', err);
                return reject({ success: false, message: 'Error al leer el archivo.' });
            }

            db.run(
                `INSERT INTO imagen (nombre_imagen, tipo_mime, imagen_data, docente) VALUES (?, ?, ?, ?)`,
                [imageName, mimeType, data, docente],
                function(err) {
                    if (err) {
                        console.error('Error al insertar la imagen:', err.message);
                        reject({ success: false, message: 'Error al insertar la imagen.', error: err.message });
                    } else {
                        console.log(`Imagen "${imageName}" insertada con ID: ${this.lastID}`);
                        resolve({ success: true, message: 'Imagen insertada correctamente.', id: this.lastID });
                    }
                }
            );
        });
    });
});
*/

// Manejador para obtener una imagen específica por ID (incluyendo los datos binarios)
ipcMain.handle('get-image-data', async (event, docente) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT imagen_data, tipo_mime FROM imagen WHERE docente = ?`, [docente], (err, row) => {
            if (err) {
                console.error('Error al obtener datos de imagen:', err.message);
                reject({ success: false, message: 'Error al obtener datos de imagen.', error: err.message });
            } else if (row) {
                // Buffer.from(row.imagen_data) asegura que sea un Buffer
                resolve({ success: true, data: row.imagen_data.toString('base64'), mimeType: row.tipo_mime });
            } else {
                resolve({ success: false, message: 'Imagen no encontrada.' });
            }
        });
    });
});

// Manejar la actualización de entidades
ipcMain.on('actualizar-image', (event, { id, value,filetype, filename, docente
}) => {
    console.log('Actualizando image con ID:', docente);
    db.run(`UPDATE imagen SET
        imagen_data = ?,
        tipo_mime = ?,
        nombre_imagen = ?
        WHERE id = ?`,
        [  value,filetype, filename, id], function(err) {
            if (err) {
                console.error('Error al actualizar image:', err.message);
                event.reply('image-actualizada', { error: err.message });
            } else {
                console.log('image actualizada con éxito:');
                event.reply('image-actualizada', { success: true });
            }
        }
    );
});


// Manejar la inserción de docentes
ipcMain.on('insertar-docente', (event, docente, carga_acad, trayecto, 
        profesion,estado,sede, carga_resp,observ, compo_docent, modalidad,estructura_bool, docent_boolean) => {
    console.log('insertar-docente', docente, trayecto)
    db.run(`INSERT INTO docente (docente,  carga_acad, trayecto, 
        profesion,estado, sede, carga_resp,observ, compo_docent, modalidad, estructura_bool,docent_boolean) VALUES (?, ?,?, ?, ?,?,?, ?,?,?,?,?)`, [docente, carga_acad, trayecto, 
        profesion,estado, sede, carga_resp,observ, compo_docent, modalidad,estructura_bool,docent_boolean ], function(err) {
        if (err) {
            event.reply('docente-insertado', { error: err.message });
        } else {
            event.reply('docente-insertado', { id: this.lastID });
        }
    });
});

// Manejar la actualización de entidades
ipcMain.on('actualizar-docente', (event, {
     docente,  carga_acad, trayecto, 
        profesion,estado, sede, carga_resp,observ, compo_docent, modalidad, estructura_bool,docent_boolean
}) => {
    console.log('Actualizando docente con ID:', docente, compo_docent, modalidad);
    db.run(`UPDATE docente SET
        
        carga_acad = ?,
        trayecto = ?,
        profesion = ?,
        estado = ?,
        sede = ?,
        carga_resp = ?,
        observ = ?,
        compo_docent = ?,
        modalidad = ?,
        estructura_bool = ?,
        docent_boolean = ?
        WHERE docente = ?`,
        [ carga_acad, trayecto, 
        profesion,estado,sede, carga_resp,observ,compo_docent, modalidad, estructura_bool, docent_boolean, docente ], function(err) {
            if (err) {
                console.error('Error al actualizar docente:', err.message);
                event.reply('docente-actualizada', { error: err.message });
            } else {
                console.log('docente actualizada con éxito:', this.changes);
                event.reply('docente-actualizada', { success: true });
            }
        }
    );
});

// Manejar la consulta de docentes
/*ipcMain.on('consultar-docente', (event) => {
    db.all(`SELECT * FROM docente`, [], (err, rows) => {
        if (err) {
            event.reply('usuarios-consultados', { error: err.message });
        } else {
            console.log('usuarios-consultados', rows);
            event.reply('usuarios-consultados', { usuarios: rows });
        }
    });
});
*/


// Manejar la consulta de C.I
ipcMain.on('consultar-docente', (event) => {
    // La consulta SQL con GROUP_CONCAT y el nuevo JOIN
    db.all(`SELECT 
                d.*,
                pers.nombre,
                pers.tlf,
                pers.fechaNac,
                pers.sexo,
                pers.email,
                pers.ci,
                img.tipo_mime,
                GROUP_CONCAT(pnf.name) AS pnf,
                s.name AS status,
                t.name AS trayecto_name,
                sede.name AS sede_name
            FROM 
                docente d
            LEFT JOIN 
                persona pers ON d.docente = pers.id 
            LEFT JOIN 
                rela_pnf rel ON d.docente = rel.docente 
            LEFT JOIN 
                pnf pnf ON rel.pnf = pnf.id
            LEFT JOIN 
                status s ON d.estado = s.id
            LEFT JOIN 
                trayecto t ON d.trayecto = t.id
            LEFT JOIN 
                sede sede ON d.sede = sede.id
            LEFT JOIN
                imagen img ON img.docente = pers.id
            WHERE 
                d.docent_boolean = 1
            GROUP BY 
                d.id`, 
    [], (err, rows) => {
        if (err) {
            event.reply('docente-consultados', { error: err.message });
        } else {
            //console.log('docente-consultados', rows);
            event.reply('docente-consultados', { data: rows });
        }
    });
});
// Manejar la consulta de C.I
ipcMain.on('consultar-estructura', (event) => {
    // La consulta SQL con GROUP_CONCAT y el nuevo JOIN
    db.all(`SELECT 
                d.*,
                pers.nombre,
                pers.tlf,
                pers.fechaNac,
                pers.sexo,
                pers.email,
                pers.ci,
                img.tipo_mime,
                GROUP_CONCAT(pnf.name) AS pnf,
                s.name AS status,
                t.name AS trayecto_name,
                sede.name AS sede_name
            FROM 
                docente d
            LEFT JOIN 
                persona pers ON d.docente = pers.id 
            LEFT JOIN 
                rela_pnf rel ON d.docente = rel.docente 
            LEFT JOIN 
                pnf pnf ON rel.pnf = pnf.id
            LEFT JOIN 
                status s ON d.estado = s.id
            LEFT JOIN 
                trayecto t ON d.trayecto = t.id
            LEFT JOIN 
                sede sede ON d.sede = sede.id
            LEFT JOIN
                imagen img ON img.docente = pers.id
            WHERE 
                d.estructura_bool = 1
            
            GROUP BY 
                d.id`, 
    [], (err, rows) => {
        if (err) {
            event.reply('estructura-consultados', { error: err.message });
        } else {
            console.log('estructura-consultados', rows);
            event.reply('estructura-consultados', { data: rows });
        }
    });
});
ipcMain.on('consultar-imagen', (event, docente_) => {
    console.log('consultar imag', docente_)
    db.get(`SELECT 
                *                
            FROM 
                imagen 
            WHERE docente = ?`, 

    [docente_], (err, rows) => {
        if (err) {
            event.reply('imagen-consultados', { error: err.message });
        } else {
           // console.log('imagen-consultados', rows);
            event.reply('imagen-consultados', { data: rows });
        }
    });
});


ipcMain.on('insertar-rela-pnf', (event, pnfs, docente) => {
    // db.serialize() asegura que las consultas se ejecuten en orden
    db.serialize(() => {
        // Preparamos la sentencia SQL una sola vez
        const stmt = db.prepare("INSERT INTO rela_pnf (pnf, docente) VALUES (?,?)");

        // Iteramos sobre el array e insertamos cada registro
        pnfs.forEach(pnf => {
            stmt.run(pnf.id, docente, function(err) {
                if (err) {
                    console.error('Error al insertar el rela_pnf:', err.message);
                } else {
                    console.log(`rela_pnf ${pnf.id} insertado con ID: ${this.lastID}`);
                }
            });
        });

        // Finalizamos la sentencia para liberar los recursos
        stmt.finalize(() => {
            // Enviamos una respuesta al proceso de renderizado
            event.reply('rela-pnf-insertados', { success: true, message: 'Todos los usuarios fueron insertados.' });
        });
    });
});

ipcMain.on('consultar-rela-pnf', (event,docente) => {
    db.all(`SELECT * FROM rela_pnf WHERE docente = ?`, [docente], (err, rows) => {
        if (err) {
            event.reply('rela_pnf-consultados', { error: err.message });
        } else {
            console.log('rela_pnf-consultados: : : ', rows);
            event.reply('rela_pnf-consultados', { pnf: rows });
        }
    });
});


ipcMain.on('eliminar-rela_pnf', (event, id) => {
    db.run(`DELETE FROM rela_pnf WHERE docente = ?`, [id], function(err) {
        if (err) {
            console.log('rela_pnf-eliminado err:  ', err);
            event.reply('rela_pnf-eliminado', { error: err.message });
        } else {
            console.log('rela_pnf-eliminado:  ');
            event.reply('rela_pnf-eliminado', { success: true, id });
        }
    });
});