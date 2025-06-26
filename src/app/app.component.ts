import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersMainComponent } from './users-main/users-main.component';
import { SidenavComponent } from './side-nav/side-nav.component';
import { UsuarioBdService } from './service/usuario-bd.service';
import { CaseService } from './service/case.service';
import { EntidadBdService } from './service/entidad-bd.service';
import { ArchivosService } from './service/archivos.service';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SCI';
  usuarios: any[] = [];
  constructor(
    private usuarioBdService: UsuarioBdService,
    private caseService: CaseService,
    private entidadBdService: EntidadBdService,
    private archivoService: ArchivosService
  ) {} 

  ngOnInit() {

    /*this.usuarioBdService.insertarUsuario(
      'sysadmin', 
      'admin', 
       11111111, 
      'sysadmin@gmail.com',
      'sysadmin',
      'sysadmin123.',
      1);*/

        /*this.usuarioBdService.insertarUsuario(
      'sysadmin', 
      'admin', 
       11111111, 
      'sysadmin@gmail.com',
      'sysadmin',
      'sysadmin123.',
      1);*/
     

    this.usuarioBdService.consultarUsuarios((rows) => {
      this.usuarios = rows;
      console.log(this.usuarios);
    });
//Casi Inv
  /*  this.caseService.insertarCaso_inv(
      '00001', 
      '26/05/2015',  
       "movil afect", 
      'tipo caso',
      'tipo irregular',
      'subtipo irregular',
      'objet',
      'incidnce',
      'modus ope',
      'area apoy',
      'detecc',
      'diagnos',
      'estado',
      'observacion',
      'soporte',
      1
    );*/

    this.caseService.consultarCaso_Inv((rows) => {
      this.usuarios = rows;
      console.log(this.usuarios);
    });


    /*
    this.entidadBdService.insertarEntidad(
      'brecha1',       // tipo_brecha
      'proyecto1',     // tipo_proyecto
      'proceso1',      // procesos_corregidos
      'proceso2',      // procesos_realizados
      'investigador1', // investigadores
      'empresa1',      // empresas
      'subtipo1',      // subtipo_ficha
      'irregularidad1',// tipo_irregularidad
      'subtipo_irreg1',// subtipo_irregularidad
      'caso1'          // procedencia_casos
    );
    */
    // Recargar la lista de entidades después de la inserción
    //this.entidadBdService.cargarEntidades();


   /* this.archivosService.insertarAmonestado(
      'AMON-001',
      'Caso-2023-001',
      'Amonestado',
      'Descripción del amonestado',
      123456789,
      'Juan',
      'Pérez',
      'Empresa Ejemplo S.A.'
    );
    
    // Obtener lista de archivos
    this.archivosService.consultarArchivos().subscribe(archivos => {
      console.log('Archivos en el sistema:', archivos);
    });
*/




/*



    this.entidadBdService.insertarEntidad(
      'brecha_seguridad',       // tipo_brecha
      'proyecto_ciber_seguridad', // tipo_proyecto
      'auditoria_seguridad',     // procesos_corregidos
      'implementacion_firewall', // procesos_realizados
      'Dr. Alejandro Torres',    // investigadores
      'TechSecure S.A.',         // empresas
      'ficha_seguridad',         // subtipo_ficha
      'acceso_no_autorizado',    // tipo_irregularidad
      'phishing',                // subtipo_irregularidad
      'caso_2023_001'            // procedencia_casos
    );
    // Insertar entidad 4
this.entidadBdService.insertarEntidad(
  'brecha_privacidad',       // tipo_brecha
  'proyecto_gestion_datos',  // tipo_proyecto
  'encriptacion_datos',      // procesos_corregidos
  'actualizacion_politicas', // procesos_realizados
  'Dra. Laura Gutierrez',    // investigadores
  'DataPrivacy Solutions',   // empresas
  'ficha_privacidad',        // subtipo_ficha
  'violacion_privacidad',    // tipo_irregularidad
  'exposicion_datos',        // subtipo_irregularidad
  'caso_2023_004'            // procedencia_casos
);

// Insertar entidad 5
this.entidadBdService.insertarEntidad(
  'brecha_etica',            // tipo_brecha
  'proyecto_investigacion_medica', // tipo_proyecto
  'revision_consentimientos', // procesos_corregidos
  'capacitacion_etica',      // procesos_realizados
  'Dr. Juan Perez',          // investigadores
  'MedResearch Institute',   // empresas
  'ficha_etica',             // subtipo_ficha
  'manipulacion_resultados', // tipo_irregularidad
  'conflicto_intereses',     // subtipo_irregularidad
  'caso_2023_005'            // procedencia_casos
);

// Insertar entidad 6
this.entidadBdService.insertarEntidad(
  'brecha_financiera',       // tipo_brecha
  'proyecto_auditoria_financiera', // tipo_proyecto
  'revision_contable',       // procesos_corregidos
  'implementacion_controles', // procesos_realizados
  'Lic. Ana Martinez',       // investigadores
  'FinanzasTransparentes S.A.', // empresas
  'ficha_financiera',        // subtipo_ficha
  'malversacion_fondos',     // tipo_irregularidad
  'desvio_recursos',         // subtipo_irregularidad
  'caso_2023_006'            // procedencia_casos
);

// Insertar entidad 7
this.entidadBdService.insertarEntidad(
  'brecha_operacional',      // tipo_brecha
  'proyecto_gestion_operaciones', // tipo_proyecto
  'optimizacion_procesos',   // procesos_corregidos
  'automatizacion_tareas',   // procesos_realizados
  'Ing. Carlos Lopez',       // investigadores
  'OperaTech Solutions',     // empresas
  'ficha_operacional',       // subtipo_ficha
  'falla_procesos',          // tipo_irregularidad
  'ineficiencia_operativa',  // subtipo_irregularidad
  'caso_2023_007'            // procedencia_casos
);

// Insertar entidad 8
this.entidadBdService.insertarEntidad(
  'brecha_legal',            // tipo_brecha
  'proyecto_cumplimiento_normativo', // tipo_proyecto
  'revision_contratos',      // procesos_corregidos
  'capacitacion_legal',      // procesos_realizados
  'Dra. Maria Fernandez',    // investigadores
  'LegalCompliance Corp.',   // empresas
  'ficha_legal',             // subtipo_ficha
  'incumplimiento_normativo', // tipo_irregularidad
  'fraude_legal',            // subtipo_irregularidad
  'caso_2023_008'            // procedencia_casos
);


*/



  }

}
