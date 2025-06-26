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

// casos de investigación
contextBridge.exposeInMainWorld('caso_inv', {
    insertarCaso_inv: (
        nro_expediente,
        fecha_inicio,
        movil_afectado,
        tipo_caso,
        tipo_irregularidad,
        subtipo_irregularidad,
        objetivo,
        incidencia,
        modus_operandi,
        area_apoyo,
        deteccion,
        diagnostico,
        estado,
        observacion,
        soporte,
        investigador
    ) => ipcRenderer.send('insertar-caso_inv', 
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
    investigador
        ),
   
    actualizarCasoInv: (id,nro_expediente, fecha_inicio,movil_afectado, tipo_caso,tipo_irregularidad, subtipo_irregularidad,objetivo,incidencia, modus_operandi, area_apoyo, deteccion, diagnostico,estado, observacion, soporte,investigador ) => {
        //console.log("actualizarCasoInv preload", soporte)
        ipcRenderer.send('actualizar-caso_inv', { id,nro_expediente, fecha_inicio,movil_afectado, tipo_caso,tipo_irregularidad, subtipo_irregularidad,objetivo,incidencia, modus_operandi, area_apoyo, deteccion, diagnostico,estado, observacion, soporte,investigador  })
    },
    
    actualizarCasoCerrado_Soporte: (id,soporte) => {
        console.log("actualizarCasoCerrado_Soporte preload",id,  soporte)
        ipcRenderer.send('actualizar-caso_cerrado_soport', { id,soporte })
    },
       // ipcRenderer.send('actualizar-caso-cerrado_soporte', { id,soporte }),
    buscarInv: (user) => ipcRenderer.send('buscar-inv', user),
    
    buscarCasoPorInv: (user) => ipcRenderer.send('buscar-caso_por_inv', user),
    
    actualizarCasoAvanc: (id,actividades, personas, monto_expuesto ) => {
        //console.log("actualizarCasoInv preload", soporte)
        ipcRenderer.send('actualizar-avances', { id,actividades, personas, monto_expuesto})
    },
    
    
    buscarCaso_Avance: (caso_id) => ipcRenderer.send('buscar-avance', caso_id),
    

    insertarCaso_Avanc: (
        casoSelected,actividades_realizadas, personas_involucradas, monto_exp
    ) => ipcRenderer.send('insertar-avances', 
        casoSelected, actividades_realizadas, personas_involucradas, monto_exp
        ),
    ///cerrar caso
    actualizarCasoCerrado: (id,conclusion, recomend, obser ) => {
        //console.log("actualizarCasoInv preload", soporte)
        ipcRenderer.send('actualizar-cerrar_caso', { id,conclusion, recomend, obser})
    },
    
    
    buscarCaso_Cerrado: (caso_id) => ipcRenderer.send('buscar-cerrar_caso', caso_id),
    

    insertarCaso_Cerrado: (
        casoSelected,conclusion, recomend, observ
    ) => ipcRenderer.send('insertar-cerrar_caso', 
        casoSelected,conclusion, recomend, observ
        ),
    //gettUser: () => ipcRenderer.send('consultar-usuarios'),
    ipcRenderer: {
        send: (channel, data) => ipcRenderer.send(channel, data),
        on: (channel, func) => ipcRenderer.on(channel, func),
        once: (channel, func) => ipcRenderer.once(channel, func), 
    },
});

// entidades
contextBridge.exposeInMainWorld('entidadesAPI', {
    insertarEntidad: (
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
    ) => ipcRenderer.send('insertar-entidad', 
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
    ),
    consultarEntidades: () => ipcRenderer.send('consultar-entidades'),
    onEntidadesConsultadas: (callback) => ipcRenderer.on('entidades-consultadas', callback),
    onEntidadInsertada: (callback) => ipcRenderer.on('entidad-insertada', callback),

    actualizarEntidad: (
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
    ) => ipcRenderer.send('actualizar-entidad', {
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
    }),
    onEntidadActualizada: (callback) => ipcRenderer.on('entidad-actualizada', callback),
});





// Archivos
contextBridge.exposeInMainWorld('archivosAPI', {
    insertarArchivo: (
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
    ) => ipcRenderer.send('insertar-archivo', {
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
    }),
    onArchivoInsertado: (callback) => ipcRenderer.on('archivo-insertado', callback),

    consultarArchivos: () => ipcRenderer.send('consultar-archivos'),
    onArchivosConsultados: (callback) => ipcRenderer.on('archivos-consultados', callback),

    actualizarArchivo: (
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
    ) => ipcRenderer.send('actualizar-archivo', {
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
    }),
    onArchivoActualizado: (callback) => ipcRenderer.on('archivo-actualizado', callback),

    eliminarArchivo: (id_archivo) => ipcRenderer.send('eliminar-archivo', id_archivo),
    onArchivoEliminado: (callback) => ipcRenderer.on('archivo-eliminado', callback),
});