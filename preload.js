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
        profesion,estado,sede, carga_resp,observ,compo_docent, modalidad, estructura_bool, docent_boolean ) => 
        ipcRenderer.send('insertar-docente', docente, carga_acad, trayecto, 
        profesion,estado, sede, carga_resp,observ, compo_docent, modalidad, estructura_bool, docent_boolean),
        // Método para escuchar la respuesta del backend
    // 'on' es el prefijo para los listeners de eventos
    onDocenteInsertado: (callback) => {
        // Usa .removeAllListeners() para evitar la acumulación de listeners
        ipcRenderer.removeAllListeners('docente-insertado');
        ipcRenderer.on('docente-insertado', (event, response) => callback(response));
    },
    insertPersona: (nombre, ci, email, tlf, fechaNac, sexo) => 
        ipcRenderer.send('insertar-persona', nombre, ci, email, tlf, fechaNac, sexo),
      // Método para escuchar la respuesta del backend
    
    onPersonaInsertado: (callback) => {
        // Usa .removeAllListeners() para evitar la acumulación de listeners
        ipcRenderer.removeAllListeners('persona-insertado');
        ipcRenderer.on('persona-insertado', (event, response) => callback(response));
    },
    deleteDocente: ( docente) => 
        ipcRenderer.send('eliminar-docente', docente),
      // Método para escuchar la respuesta del backend
    
    onDocenteDelete: (callback) => {
        // Usa .removeAllListeners() para evitar la acumulación de listeners
        ipcRenderer.removeAllListeners('docente-eliminado');
        ipcRenderer.on('docente-eliminado', (event, response) => callback(response));
    },
    deletePersona: ( docente) => 
        ipcRenderer.send('eliminar-persona', docente),
      // Método para escuchar la respuesta del backend
    
    onPersonaDelete: (callback) => {
        // Usa .removeAllListeners() para evitar la acumulación de listeners
        ipcRenderer.removeAllListeners('persona-eliminado');
        ipcRenderer.on('persona-eliminado', (event, response) => callback(response));
    },
    deleteIMG: ( docente) => 
        ipcRenderer.send('eliminar-img', docente),
      // Método para escuchar la respuesta del backend
    
    onIMGDelete: (callback) => {
        // Usa .removeAllListeners() para evitar la acumulación de listeners
        ipcRenderer.removeAllListeners('img-eliminado');
        ipcRenderer.on('img-eliminado', (event, response) => callback(response));
    },
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
        profesion,estado, sede, carga_resp,observ, compo_docent, modalidad, estructura_bool, docent_boolean) => 
        ipcRenderer.send('actualizar-docente', { docente,  carga_acad, trayecto, 
        profesion,estado, sede, carga_resp,observ, compo_docent, modalidad, estructura_bool, docent_boolean }),
    
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
   insertPNF: (nombre) => 
        ipcRenderer.send('insertar-pnf', nombre),
      // Método para escuchar la respuesta del backend
    
    onPNFInsertado: (callback) => {
        // Usa .removeAllListeners() para evitar la acumulación de listeners
        ipcRenderer.removeAllListeners('pnf-insertado');
        ipcRenderer.on('pnf-insertado', (event, response) => callback(response));
    },

   insertPNFsDoc: (pnfs, docente) => 
        ipcRenderer.send('insertar-rela-pnf', pnfs, docente),
      // Método para escuchar la respuesta del backend
    
    onPNFDocInsertado: (callback) => {
        // Usa .removeAllListeners() para evitar la acumulación de listeners
        ipcRenderer.removeAllListeners('rela-pnf-insertados');
        ipcRenderer.on('rela-pnf-insertados', (event, response) => callback(response));
    },
   buscarPNFDoc: ( docente) => 
        ipcRenderer.send('consultar-rela-pnf', docente),
      // Método para escuchar la respuesta del backend
    
    onPNFDocBuscar: (callback) => {
        // Usa .removeAllListeners() para evitar la acumulación de listeners
        ipcRenderer.removeAllListeners('rela_pnf-consultados');
        ipcRenderer.on('rela_pnf-consultados', (event, response) => callback(response));
    },
   deletePNFDoc: ( docente) => 
        ipcRenderer.send('eliminar-rela_pnf', docente),
      // Método para escuchar la respuesta del backend
    
    onPNFDocDelete: (callback) => {
        // Usa .removeAllListeners() para evitar la acumulación de listeners
        ipcRenderer.removeAllListeners('rela_pnf-eliminado');
        ipcRenderer.on('rela_pnf-eliminado', (event, response) => callback(response));
    },

   // buscarPNFDoc: (docente) => ipcRenderer.send('consultar-rela-pnf', docente),
   deletePNF: (id) => 
        ipcRenderer.send('eliminar-pnf', id),
      // Método para escuchar la respuesta del backend
    
        onPNFdelete: (callback) => {
            // Usa .removeAllListeners() para evitar la acumulación de listeners
            ipcRenderer.removeAllListeners('pnf-eliminado');
            ipcRenderer.on('pnf-eliminado', (event, response) => callback(response));
    },
    actualizarPNF: (id, nombre, activo) => 
        ipcRenderer.send('actualizar-pnf', {id, nombre, activo }),
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
    onImagenInsertado: (callback) => {
        // Usa .removeAllListeners() para evitar la acumulación de listeners
        ipcRenderer.removeAllListeners('imagen-insertado');
        ipcRenderer.on('imagen-insertado', (event, response) => callback(response));
    },
    
    ipcRenderer: {
        send: (channel, data) => ipcRenderer.send(channel, data),
        on: (channel, func) => ipcRenderer.on(channel, func),
        once: (channel, func) => ipcRenderer.once(channel, func),
    },
});