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

    // Crear la tabla
    db.run(`CREATE TABLE IF NOT EXISTS caso_investigador (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nro_expediente TEXT,
        fecha_inicio TEXT ,
        movil_afectado TEXT ,
        tipo_caso TEXT ,
        tipo_irregularidad TEXT ,
        subtipo_irregularidad TEXT ,
        objetivo TEXT ,
        incidencia TEXT ,
        modus_operandi TEXT ,
        area_apoyo TEXT ,
        deteccion TEXT ,
        diagnostico TEXT ,
        estado TEXT ,
        observacion TEXT ,
        soporte TEXT ,
        investigador INTEGER,
        FOREIGN KEY (investigador) REFERENCES usuario(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS entidades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo_brecha TEXT,
        tipo_proyecto TEXT,
        procesos_corregidos TEXT,
        procesos_realizados TEXT,
        investigadores TEXT,
        empresas TEXT,
        subtipo_ficha TEXT,
        tipo_irregularidad TEXT,
        subtipo_irregularidad TEXT,
        procedencia_casos TEXT,
        FOREIGN KEY (investigadores) REFERENCES usuario(id)
    )`, (err) => {
        if (err) {
            console.error('Error al crear la tabla "entidad":', err.message);
        } else {
            console.log('Tabla "entidad" creada o verificada correctamente.');
        }
    });

    
    // Crear la tabla
    db.run(`CREATE TABLE IF NOT EXISTS avances (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        caso_inv INTEGER,
        fecha TEXT ,
        actividades_realizadas TEXT ,
        personas_involucradas TEXT ,
        monto_exp TEXT ,
        estado TEXT ,
        
        FOREIGN KEY (caso_inv) REFERENCES caso_investigador(id)
    )`);
    

    // Crear la tabla
    db.run(`CREATE TABLE IF NOT EXISTS cerrar_caso (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        observ TEXT ,
        caso_inv INTEGER,
        conclusion TEXT ,
        recomend TEXT ,
        estado TEXT ,
        
        FOREIGN KEY (caso_inv) REFERENCES caso_investigador(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS archivos (
        id_archivo TEXT PRIMARY KEY,
        tipo TEXT NOT NULL,
        descripcion TEXT,
        caso TEXT,
        serial TEXT,
        tipoEquipo TEXT,
        modelo TEXT,
        observaciones TEXT,
        cedula INTEGER,
        nombre TEXT,
        apellido TEXT,
        empresa TEXT
    )`);
    
    
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
// Buscar usuario por username
ipcMain.on('buscar-inv', (event, user) => {
    console.log('inv-buscado ');
    db.all(`SELECT * FROM usuario WHERE rol =  ?`, [0], (err, rows) => {
        if (err) {
            event.reply('inv-buscado', { error: err.message });
        } else {
            console.log('inv-buscado', rows);
            event.reply('inv-buscado', { success: true, usuarios: rows });
        }
    });
});

//Buscar casos de inv por inestigador
ipcMain.on('buscar-caso_por_inv', (event, user) => {
    console.log('caso_por_inv-buscado ');
    db.all(`SELECT * FROM caso_investigador WHERE investigador =  ?`, [user], (err, rows) => {
        if (err) {
            event.reply('caso_por_inv-buscado', { error: err.message });
        } else {
            console.log('caso_por_inv-buscado', rows);
            event.reply('caso_por_inv-buscado', { success: true, usuarios: rows });
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

// Insertar en entidades
ipcMain.on('insertar-entidad', (event, tipo_brecha, tipo_proyecto, procesos_corregidos, procesos_realizados, investigadores, empresas, subtipo_ficha, tipo_irregularidad, subtipo_irregularidad, procedencia_casos) => {
    db.run(`INSERT INTO entidades (
        tipo_brecha,
        tipo_proyecto,
        procesos_corregidos,
        procesos_realizados,
        investigadores,
        empresas,
        subtipo_ficha,
        tipo_irregularidad,
        subtipo_irregularidad,
        procedencia_casos
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [tipo_brecha, tipo_proyecto, procesos_corregidos, procesos_realizados, investigadores, empresas, subtipo_ficha, tipo_irregularidad, subtipo_irregularidad, procedencia_casos], function(err) {
        if (err) {
            event.reply('entidad-insertada', { error: err.message });
        } else {
            event.reply('entidad-insertada', { id: this.lastID });
        }
    });
});

// Consultar entidades
ipcMain.on('consultar-entidades', (event) => {
    db.all(`SELECT * FROM entidades`, [], (err, rows) => {
        if (err) {
            event.reply('entidades-consultadas', { error: err.message });
        } else {
            event.reply('entidades-consultadas', { entidades: rows });
        }
    });
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



ipcMain.on('eliminar-usuario', (event, id) => {
    db.run(`DELETE FROM usuario WHERE id = ?`, [id], function(err) {
        if (err) {
            event.reply('usuario-eliminado', { error: err.message });
        } else {
            event.reply('usuario-eliminado', { success: true, id });
        }
    });
});

ipcMain.on('actualizar-usuario', (event, { id, nombre, apellido,ci, email,user, password, rol }) => {
    db.run(`UPDATE usuario SET nombre = ?, apellido = ?, cedula = ?, correo = ?,usuario = ?, contrasena = ?, rol = ? WHERE id = ?`, 
        [nombre, apellido,ci, email,user, password, rol, id], function(err) {
        if (err) {
            event.reply('usuario-actualizado', { error: err.message });
        } else {
            event.reply('usuario-actualizado', { success: true, id, nombre, email });
        }
    });
});





// Manejar la inserción de C.I
ipcMain.on('insertar-caso_inv', (event,
    nro_expediente,
    fecha_inicio  ,
    movil_afectado  ,
    tipo_caso  ,
    tipo_irregularidad  ,
    subtipo_irregularidad  ,
    objetivo  ,
    incidencia  ,
    modus_operandi  ,
    area_apoyo  ,
    deteccion  ,
    diagnostico  ,
    estado  ,
    observacion  ,
    soporte  ,
    investigador ) => {

    console.log('insertar-caso_inv')

    db.run(`INSERT INTO caso_investigador (
    nro_expediente,
    fecha_inicio  ,
    movil_afectado  ,
    tipo_caso  ,
    tipo_irregularidad  ,
    subtipo_irregularidad  ,
    objetivo  ,
    incidencia  ,
    modus_operandi  ,
    area_apoyo  ,
    deteccion  ,
    diagnostico  ,
    estado  ,
    observacion  ,
    soporte  ,
    investigador) VALUES (?, ?, ?, ?,?, ?,?,?, ?, ?, ?,?, ?,?,?,?)`, [
        nro_expediente,
        fecha_inicio  ,
        movil_afectado  ,
        tipo_caso  ,
        tipo_irregularidad  ,
        subtipo_irregularidad  ,
        objetivo  ,
        incidencia  ,
        modus_operandi  ,
        area_apoyo  ,
        deteccion  ,
        diagnostico  ,
        estado  ,
        observacion  ,
        soporte  ,
        investigador], function(err) {
        if (err) {
            event.reply('caso_inv-insertado', { error: err.message });
        } else {
            event.reply('caso_inv-insertado', { id: this.lastID });
        }
    });
});

// Manejar la consulta de C.I
ipcMain.on('consultar-caso_inv', (event) => {
    db.all(`SELECT 
                ci.*,           -- Selecciona todos los campos de caso_investigador
                u.nombre,       -- Selecciona el nombre del investigador (puede ser NULL)
                u.cedula       -- Selecciona el ci del investigador (puede ser NULL)
            FROM 
                caso_investigador ci
            LEFT JOIN 
                usuario u ON ci.investigador = u.id`, 
    [], (err, rows) => {
        if (err) {
            event.reply('caso_inv-consultados', { error: err.message });
        } else {
            console.log('caso_inv-consultados', rows);
            event.reply('caso_inv-consultados', { data: rows });
        }
    });
});

// Manejar la inserción de usuarios
ipcMain.on('insertar-caso_inv', (event, nro_expediente, fecha_inicio,movil_afectado, tipo_caso,tipo_irregularidad, subtipo_irregularidad,objetivo,incidencia, modus_operandi, area_apoyo, deteccion, diagnostico,estado, observacion, soporte,investigador ) => {
    console.log('insertar-caso_inv', nro_expediente, fecha_inicio,movil_afectado, tipo_caso,tipo_irregularidad, subtipo_irregularidad,objetivo,incidencia, modus_operandi, area_apoyo, deteccion, diagnostico,estado, observacion, soporte,investigador )
    db.run(`INSERT INTO caso_investigador (nro_expediente, fecha_inicio,movil_afectado, tipo_caso,tipo_irregularidad, subtipo_irregularidad,objetivo,incidencia, modus_operandi, area_apoyo, deteccion, diagnostico,estado, observacion, soporte,investigador ) VALUES (?, ?,?, ?,?,?,?,?, ?, ?, ?,?, ?,?,?,?)`, [nro_expediente, fecha_inicio,movil_afectado, tipo_caso,tipo_irregularidad, subtipo_irregularidad,objetivo,incidencia, modus_operandi, area_apoyo, deteccion, diagnostico,estado, observacion, soporte,investigador], function(err) {
        if (err) {
            event.reply('caso_inv-insertado', { error: err.message });
        } else {
            event.reply('caso_inv-insertado', { id: this.lastID });
        }
    });
});

ipcMain.on('actualizar-caso_inv', (event, { id, nro_expediente, fecha_inicio,movil_afectado, tipo_caso,tipo_irregularidad, subtipo_irregularidad,objetivo,incidencia, modus_operandi, area_apoyo, deteccion, diagnostico,estado, observacion, soporte,investigador }) => {
    //console.log('actualizar-caso_inv', nro_expediente, fecha_inicio,movil_afectado, tipo_caso,tipo_irregularidad, subtipo_irregularidad,objetivo,incidencia, modus_operandi, area_apoyo, deteccion, diagnostico,estado, observacion, soporte,investigador )
    db.run(`UPDATE caso_investigador SET nro_expediente = ?, fecha_inicio = ?, movil_afectado = ?, tipo_caso = ?,tipo_irregularidad = ?, subtipo_irregularidad = ?,objetivo = ?,incidencia = ?, modus_operandi = ? , area_apoyo = ? , deteccion = ? , diagnostico = ? , estado = ?, observacion = ?, soporte = ? , investigador = ?    WHERE id = ?`, 
        [nro_expediente, fecha_inicio,movil_afectado, tipo_caso,tipo_irregularidad, subtipo_irregularidad,objetivo,incidencia, modus_operandi, area_apoyo, deteccion, diagnostico,estado, observacion, soporte,investigador , id], function(err) {
        if (err) {
            event.reply('caso_inv-actualizado', { error: err.message });
        } else {
            event.reply('caso_inv-actualizado', { success: true, id});
        }
    });





    
    
    
    ipcMain.on('actualizar-entidad', (event, {
    id,
    tipo_brecha,
    tipo_proyecto,
    procesos_corregidos,
    procesos_realizados,
    investigadores,
    empresas,
    subtipo_ficha,
    tipo_irregularidad,
    subtipo_irregularidad,
    procedencia_casos
}) => {
    console.log('Actualizando entidad con ID:', id);
    db.run(`UPDATE entidades SET
        tipo_brecha = ?,
        tipo_proyecto = ?,
        procesos_corregidos = ?,
        procesos_realizados = ?,
        investigadores = ?,
        empresas = ?,
        subtipo_ficha = ?,
        tipo_irregularidad = ?,
        subtipo_irregularidad = ?,
        procedencia_casos = ?
        WHERE id = ?`,
        [
            tipo_brecha,
            tipo_proyecto,
            procesos_corregidos,
            procesos_realizados,
            investigadores,
            empresas,
            subtipo_ficha,
            tipo_irregularidad,
            subtipo_irregularidad,
            procedencia_casos,
            id
        ], function(err) {
            if (err) {
                console.error('Error al actualizar entidad:', err.message);
                event.reply('entidad-actualizada', { error: err.message });
            } else {
                console.log('Entidad actualizada con éxito:', this.changes);
                event.reply('entidad-actualizada', { success: true, id });
            }
        }
    );
});








});


// Manejar la actualización de entidades
ipcMain.on('actualizar-entidad', (event, {
    id,
    tipo_brecha,
    tipo_proyecto,
    procesos_corregidos,
    procesos_realizados,
    investigadores,
    empresas,
    subtipo_ficha,
    tipo_irregularidad,
    subtipo_irregularidad,
    procedencia_casos
}) => {
    console.log('Actualizando entidad con ID:', id);
    db.run(`UPDATE entidades SET
        tipo_brecha = ?,
        tipo_proyecto = ?,
        procesos_corregidos = ?,
        procesos_realizados = ?,
        investigadores = ?,
        empresas = ?,
        subtipo_ficha = ?,
        tipo_irregularidad = ?,
        subtipo_irregularidad = ?,
        procedencia_casos = ?
        WHERE id = ?`,
        [
            tipo_brecha,
            tipo_proyecto,
            procesos_corregidos,
            procesos_realizados,
            investigadores,
            empresas,
            subtipo_ficha,
            tipo_irregularidad,
            subtipo_irregularidad,
            procedencia_casos,
            id
        ], function(err) {
            if (err) {
                console.error('Error al actualizar entidad:', err.message);
                event.reply('entidad-actualizada', { error: err.message });
            } else {
                console.log('Entidad actualizada con éxito:', this.changes);
                event.reply('entidad-actualizada', { success: true, id });
            }
        }
    );
});


// Manejar la inserción de AVANCES
ipcMain.on('insertar-avances', (event,casoSelected,actividades_realizadas, personas_involucradas, monto_exp) => {
    console.log('insertar-avances',actividades_realizadas, personas_involucradas, monto_exp)
    db.run(`INSERT INTO avances (caso_inv, actividades_realizadas, personas_involucradas, monto_exp) VALUES (?, ?, ?, ?)`, [casoSelected,actividades_realizadas, personas_involucradas, monto_exp], function(err) {
        if (err) {
            event.reply('avances-insertado', { error: err.message });
        } else {
            event.reply('avances-insertado', { id: this.lastID });
        }
    });
});

// Manejar la consulta de AVANCES
ipcMain.on('consultar-avances', (event) => {
    db.all(`SELECT * FROM avances`, [], (err, rows) => {
        if (err) {
            event.reply('avances-consultados', { error: err.message });
        } else {
            console.log('avances-consultados', rows);
            event.reply('avances-consultados', { data: rows });
        }
    });
});

ipcMain.on('buscar-avance', (event, caso_id) => {
    console.log('avance-buscado ');
    db.all(`SELECT * FROM avances WHERE caso_inv =  ?`, [caso_id], (err, rows) => {
        if (err) {
            event.reply('avance-buscado', { error: err.message });
        } else {
            console.log('avance-buscado', rows);
            event.reply('avance-buscado', { success: true, data: rows });
        }
    });
});

ipcMain.on('actualizar-avances', (event, { id,actividades, personas, monto_expuesto }) => {
    db.run(`UPDATE avances SET actividades_realizadas = ?, personas_involucradas = ?, monto_exp = ? WHERE id = ?`, 
        [actividades, personas, monto_expuesto, id], function(err) {
        if (err) {
            event.reply('avances-actualizado', { error: err.message });
        } else {
            event.reply('avances-actualizado', { success: true, id });
        }
    });
});

ipcMain.on('actualizar-caso_cerrado_soport', (event, { id,soporte }) => {
    db.run(`UPDATE caso_investigador SET soporte = ? WHERE id = ?`, 
        [soporte, id], function(err) {
        if (err) {
            event.reply('caso_cerrado_soport-actualizado', { error: err.message });
        } else {
            event.reply('caso_cerrado_soport-actualizado', { success: true, id });
        }
    });
});

//Cerrar caso
// Manejar la inserción de AVANCES
ipcMain.on('insertar-cerrar_caso', (event,casoSelected,conclusion, recomend, observ) => {
    console.log('insertar-cerrar_caso',conclusion, recomend, observ)
    db.run(`INSERT INTO cerrar_caso (caso_inv, conclusion, recomend, observ) VALUES (?, ?, ?, ?)`, [casoSelected,conclusion, recomend, observ], function(err) {
        if (err) {
            event.reply('cerrar_caso-insertado', { error: err.message });
        } else {
            event.reply('cerrar_caso-insertado', { id: this.lastID });
        }
    });
});

// Manejar la consulta de AVANCES
ipcMain.on('consultar-cerrar_caso', (event) => {
    db.all(`SELECT * FROM cerrar_caso`, [], (err, rows) => {
        if (err) {
            event.reply('cerrar_caso-consultados', { error: err.message });
        } else {
            console.log('cerrar_caso-consultados', rows);
            event.reply('cerrar_caso-consultados', { data: rows });
        }
    });
});

ipcMain.on('buscar-cerrar_caso', (event, caso_id) => {
    console.log('cerrar_caso-buscado ');
    db.all(`SELECT * FROM cerrar_caso WHERE caso_inv =  ?`, [caso_id], (err, rows) => {
        if (err) {
            event.reply('cerrar_caso-buscado', { error: err.message });
        } else {
            console.log('cerrar_caso-buscado', rows);
            event.reply('cerrar_caso-buscado', { success: true, data: rows });
        }
    });
});

ipcMain.on('actualizar-cerrar_caso', (event, { id,conclusion, recomend, observ }) => {
    db.run(`UPDATE cerrar_caso SET conclusion = ?, recomend = ?, observ = ? WHERE id = ?`, 
        [conclusion, recomend, observ, id], function(err) {
        if (err) {
            event.reply('cerrar_caso-actualizado', { error: err.message });
        } else {
            event.reply('cerrar_caso-actualizado', { success: true, id });
        }
    });
});

// Insertar archivo
ipcMain.on('insertar-archivo', (event, archivo) => {
    const query = `INSERT INTO archivos (
        id_archivo,
        tipo,
        descripcion,
        caso,
        serial,
        tipoEquipo,
        modelo,
        observaciones,
        cedula,
        nombre,
        apellido,
        empresa
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const params = [
        archivo.id_archivo,
        archivo.tipo,
        archivo.descripcion,
        archivo.caso,
        archivo.serial,
        archivo.tipoEquipo,
        archivo.modelo,
        archivo.observaciones,
        archivo.cedula,
        archivo.nombre,
        archivo.apellido,
        archivo.empresa
    ];

    db.run(query, params, function(err) {
        if (err) {
            event.reply('archivo-insertado', { error: err.message });
        } else {
            event.reply('archivo-insertado', { id: this.lastID });
        }
    });
});

// Consultar archivos
ipcMain.on('consultar-archivos', (event) => {
    db.all(`SELECT * FROM archivos`, [], (err, rows) => {
        if (err) {
            event.reply('archivos-consultados', { error: err.message });
        } else {
            event.reply('archivos-consultados', { archivos: rows });
        }
    });
});

// Actualizar archivo
ipcMain.on('actualizar-archivo', (event, archivo) => {
    const query = `UPDATE archivos SET
        tipo = ?,
        descripcion = ?,
        caso = ?,
        serial = ?,
        tipoEquipo = ?,
        modelo = ?,
        observaciones = ?,
        cedula = ?,
        nombre = ?,
        apellido = ?,
        empresa = ?
        WHERE id_archivo = ?`;
    
    const params = [
        archivo.tipo,
        archivo.descripcion,
        archivo.caso,
        archivo.serial,
        archivo.tipoEquipo,
        archivo.modelo,
        archivo.observaciones,
        archivo.cedula,
        archivo.nombre,
        archivo.apellido,
        archivo.empresa,
        archivo.id_archivo
    ];

    db.run(query, params, function(err) {
        if (err) {
            event.reply('archivo-actualizado', { error: err.message });
        } else {
            event.reply('archivo-actualizado', { success: true });
        }
    });
});

// Eliminar archivo
ipcMain.on('eliminar-archivo', (event, id_archivo) => {
    db.run(`DELETE FROM archivos WHERE id_archivo = ?`, [id_archivo], function(err) {
        if (err) {
            event.reply('archivo-eliminado', { error: err.message });
        } else {
            event.reply('archivo-eliminado', { success: true });
        }
    });
});