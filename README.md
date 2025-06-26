# Sistema de Gestión de Casos de Investigación (SCI)

Este proyecto fue desarrollado con Angular 18 para el frontend, Electron en su versión 34.2.0 para la aplicación de escritorio y SQLite 3 como base de datos local. El sistema permite a los investigadores y administradores gestionar casos de investigación, realizar seguimientos, gestionar archivos y usuarios.

La aplicación cuenta con los siguientes modulos:

### 1. Módulo de Inicio de Sesión y Registro
#### 1.1. Inicio de Sesión
- **Descripción:** Permite a los usuarios registrados (investigadores y administradores) iniciar sesión con sus credenciales (nombre de usuario y contraseña).
- **Validación:** Las credenciales son validadas y se permite el acceso segun el rol del usuario si son correctas.
#### Credenciales de administrador para ingresar al sistema
Se proveen las siguientes credenciales para poder ingresar al sistema en modo administrador:
**Nombre de usuario:** sysadmin
**Contraseña:** sysadmin123.

#### 1.2. Registro de Usuario
- **Descripción:** Permite al administrador registrar nuevos usuarios con los siguientes datos:
  - Nombre
  - Apellido
  - Documento de identidad
  - Correo
  - Nombre de usuario
  - Contraseña
  - Rol de usuario (0 para investigador y 1 para administrador)
- **Listado de Usuarios:** El administrador puede ver la tabla de usuarios registrados y de alli poder modifiar el mismo. 

### 2. Módulo de Registro y actualización de Casos de Investigación

#### 2.1. Registro de Casos
- **Descripción:** Permite registrar casos de investigación con los siguientes datos:
  - Número de expediente
  - Investigador
  - Fecha de inicio
  - Días (Cantidad de días)
  - Mes (Lista de meses que duró el caso)
  - Móvil afectado
  - Tipo de caso
  - Tipo de irregularidad
  - Subtipo de irregularidad
  - Objetivo / Agraviado
  - Incidencia
  - Duración (Días)
  - Descripción Modus Operandi
  - Área Apoyo a Resolver
  - Detección / Procedencia del Caso
  - Diagnóstico / Detalle de Comprobación para Determinar Fraude
  - Actuaciones / Acciones Realizadas
  - Conclusiones / Recomendaciones
  - Observaciones
  - Soporte
  **Cartelera de casos:** El sistema permite consultar la tabla de los casos registrados y de alli poder modificar, registrar avances, cerrar casos y en modo admin poder reabrir casos.

  #### 2.2. Estado Inicial del Caso
- **Descripción:** El estado inicial del caso se establece como:
  - **Abierto** si lo registra un investigador.
  - **Asignado** si lo registra un administrador.

  #### 2.3. Asignación de Casos
- **Descripción:** Permite al administrador asignar o reasignar casos de investigación a los investigadores.

#### 2.4. Registro de Avances
- **Descripción:** se permite registrar avances con los siguientes eventos:
  - Actividades realizadas
  - Personas involucradas
  - Monto expuesto
  - Cambio de estatus

#### 2.3. Cierre de Casos
- **Descripción:** Permite a los usuarios autorizados cerrar casos de investigación
- **Datos Obligatorios:** Al cerrar un caso, se deben proporcionar:
  - Observaciones
  - Conclusiones
  - Recomendaciones

#### 2.4. Reapertura de Casos
- **Descripción:** Permite la reapertura de casos cerrados.
- **Limitaciones:** Las modificaciones en casos reabiertos se limitan únicamente al campo de soporte.

### 3. Módulo de Gestión de Entidades

#### 3.1. Registro y Mantenimiento de Entidades
- **Descripción:** Permite el registro y mantenimiento de entidades del sistema, como:
  - Tipo de Brecha
  - Tipo de Proyecto
  - Procesos Corregidos
  - Procesos Realizados
  - Investigadores
  - Empresas
  - Subtipo de Ficha
  - Tipo de Irregularidad
  - Subtipo de Irregularidad
  - Procedencia de Casos

## Desarrollo
Electron provee la configuracion inicial de la aplicación en el archivo main.js, en el se definen y se crean las tablas de la base de datos, tambien se definen las consultas y las inserciones en la misma, asi como tambien se definen las configuraciones para la ventana donde se ejecutara la aplicación.

por otra parte tenemos el preload.js que juega un papel importante para garantizar una comunicacion entre el proceso principal y el proceso de renderizado de angular que estan definidos en el directorio service enviando y recibiendo mensajes usando las APIs expuestas en preload.js

Luego por la parte de Angular encontramos la aplicacion estructurada en modulos y componentes reutilizables dado que este framework presenta el codio de manera modular y organizada.  

En el directorio models se encuentran definidos los modelos de los distintos tiopos de objetos tales como entidad, usuarios, casos, archivos, reportes, etc.

**Factory Method** 
Para el caso de archivos y reportes se utilizó el patrón de diseño factory method, ambos patrones se encuentran  definidos en su respectivo modelo. 


## Servidor de Desarrollo de la Aplicación de Escritorio

instala las dependencias: npm install
Ejecute npm run electron-build y se iniciará la aplicación.

## Instalación

Ejecute npm run electron-builder para construir la aplicación. El ejecutable se creará dentro de  `dist/`, tendra por nombre : `Sistema de Casos de Investigación Setup 0.0.0.exe`

## Objetivo del proyecto

Este proyecto fue desarrollado con un objetivo académico, como parte de la asignatura Patrones de Diseño y Frameworks de la Escuela de Computación en la Universidad Central de Venezuela.

## Desarrolladores

- Edgar Gerig (V25.858.414)
- Pebelin Hernandez (V25.129.892)




