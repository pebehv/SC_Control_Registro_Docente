const { contextBridge, ipcRenderer } = require('electron');

console.log("en preload.js");

// Exponer métodos relacionados con usuarios
contextBridge.exposeInMainWorld('myAPI', {
    insertUser: (nombre, apellido, ci, email, user, password, rol) => 
        ipcRenderer.send('insertar-usuario', nombre, apellido, ci, email, user, password, rol),
    eliminarUsuario: (id) => ipcRenderer.send('eliminar-usuario', id),
    buscarUser: (user) => ipcRenderer.send('buscar-user', user),
    login: (user, pass) => ipcRenderer.send('login', user, pass),
    obtenerRol: (user) => ipcRenderer.send('obtener-rol', user),
    actualizarUsuario: (id, nombre, apellido, ci, email, user, password, rol) => 
        ipcRenderer.send('actualizar-usuario', { id, nombre, apellido, ci, email, user, password, rol }),
    ipcRenderer: {
        send: (channel, data) => ipcRenderer.send(channel, data),
        on: (channel, func) => ipcRenderer.on(channel, func),
        once: (channel, func) => ipcRenderer.once(channel, func),
    },
});
// Exponer métodos relacionados con docentes

contextBridge.exposeInMainWorld('docenteAPI', {
    insertDocente: (docente, carga_acad, trayecto,
        profesion,estado) => 
        ipcRenderer.send('insertar-docente', docente, carga_acad, trayecto, 
        profesion,estado),
    insertPersona: (nombre, apellido, ci, email, tlf, fechaNac, sexo) => 
        ipcRenderer.send('insertar-persona', nombre, apellido, ci, email, tlf, fechaNac, sexo),
   /* eliminarUsuario: (id) => ipcRenderer.send('eliminar-usuario', id),
    buscarUser: (user) => ipcRenderer.send('buscar-user', user),
    login: (user, pass) => ipcRenderer.send('login', user, pass),
    obtenerRol: (user) => ipcRenderer.send('obtener-rol', user),*/
    /*actualizarDocente: (nombre, apellido, ci, email, tlf, fechaNac, sexo) => 
        ipcRenderer.send('actualizar-docente', { nombre, apellido, ci, email, tlf, fechaNac, sexo }),
    */
    actualizarPersona: (id,nombre, apellido, ci, email, tlf, fechaNac, sexo) => 
        ipcRenderer.send('actualizar-persona', {id, nombre, apellido, ci, email, tlf, fechaNac, sexo }),
    actualizarDocente: ( docente,  carga_acad, trayecto, 
        profesion,estado) => 
        ipcRenderer.send('actualizar-docente', { docente,  carga_acad, trayecto, 
        profesion,estado}),
    
    ipcRenderer: {
        send: (channel, data) => ipcRenderer.send(channel, data),
        on: (channel, func) => ipcRenderer.on(channel, func),
        once: (channel, func) => ipcRenderer.once(channel, func),
    },
});
// Exponer métodos relacionados con pnf

contextBridge.exposeInMainWorld('pnfAPI', {
   /* insertUser: (nombre, apellido, ci, email, user, password, rol) => 
        ipcRenderer.send('insertar-usuario', nombre, apellido, ci, email, user, password, rol),
    eliminarUsuario: (id) => ipcRenderer.send('eliminar-usuario', id),
    buscarUser: (user) => ipcRenderer.send('buscar-user', user),
    login: (user, pass) => ipcRenderer.send('login', user, pass),
    obtenerRol: (user) => ipcRenderer.send('obtener-rol', user),
    actualizarUsuario: (id, nombre, apellido, ci, email, user, password, rol) => 
        ipcRenderer.send('actualizar-usuario', { id, nombre, apellido, ci, email, user, password, rol }),
    */
    ipcRenderer: {
        send: (channel, data) => ipcRenderer.send(channel, data),
        on: (channel, func) => ipcRenderer.on(channel, func),
        once: (channel, func) => ipcRenderer.once(channel, func),
    },
});


contextBridge.exposeInMainWorld('img_api', {
    actualizarImage: (id, value,filetype, filename, docente) => 
        ipcRenderer.send('actualizar-image', { id, value,filetype, filename, docente }),
    
    consultarImage: ( docente) => 
        ipcRenderer.send('consultar-imagen', docente ),
    
    /*insertImage: (filename,filetype, value, docente) =>
        ipcRenderer.invoke('insert-image', { filename,filetype, value, docente }),
    */
    insertImage: (filename,filetype, value_, docente) =>
        ipcRenderer.send('insert-image',  value_,filetype, filename, docente ),
    getImages: () => ipcRenderer.invoke('get-images'),
    getImageData: (docente) => ipcRenderer.invoke('get-image-data', docente),
    
    ipcRenderer: {
        send: (channel, data) => ipcRenderer.send(channel, data),
        on: (channel, func) => ipcRenderer.on(channel, func),
        once: (channel, func) => ipcRenderer.once(channel, func),
    },
});