import { Component, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Case } from '../../models/case.model';
import { CaseService } from '../../service/case.service';
import { NgIf } from '@angular/common';
import { UsuarioBdService } from '../../service/usuario-bd.service';
import { EntidadBdService } from '../../service/entidad-bd.service';
import { IEntidad } from '../../models/entidad.model';
import { IUser } from '../../models/user.model';




@Component({
  selector: 'app-form-case',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf ],
  templateUrl: './form-case.component.html',
  styleUrls: ['./form-case.component.css'],
})
export class FormCaseComponent {
  
  showRegistrarAvances: boolean = false;
  @Input()casoSelected : Case = new Case();
  @Input()activeTabId : number = -1;
  @Output() goBack = new EventEmitter<void>();
  caseForm!: FormGroup;
  usuarios: IUser[] = []
  entidades: IEntidad[] = [];  

  isDisabled: boolean = true; // Inicialmente, el select está habilitado
  user_id: number |null = null;
  rol: number |null = null;
  constructor(
    private fb: FormBuilder,
    private caseService: CaseService,
    private cdr: ChangeDetectorRef,
    private usuarioBdService: UsuarioBdService,
    private entidadBdService: EntidadBdService,
  
  ) {
    this.loadForm();
    
  }
  ngOnInit() {
    this.user_id = this.usuarioBdService.getCurrentUserUser();
    
    this.rol = this.usuarioBdService.getCurrentUserRole();
    console.log("Form Case Component",this.user_id, this.casoSelected)
    this.cdr.detectChanges()
    if(!this.casoSelected ){
      this.casoSelected = new Case();
      this.cdr.detectChanges()
        }
    this.setForm(); 
    this.getUser(); 
    this.cargarEntidades(); 
  }

  onGoBack() {
    console.log("onGoBack FormCaseComponent")
    this.goBack.emit(); // Emitir el evento
  }

  getUser(){

    console.log("refresh")
    this.caseService.buscarInv().subscribe((value:IUser[]) => {
      this.usuarios = value
      this.updateSelectDisabledState()
      console.log("array ", value)
      this.cdr.detectChanges();
    });
  }

  updateSelectDisabledState() {
   // this.isDisabled = this.casoSelected.investigador === null; // Cambia la lógica según tu necesidad
    if (this.rol != 1) {
      this.caseForm.get('investigador')?.disable(); // Deshabilita el control
    } else {
      this.caseForm.get('investigador')?.enable(); // Habilita el control
    }
    
    if (this.activeTabId == 3) {
      this.caseForm.get('investigador')?.disable(); // Deshabilita el control
      this.caseForm.get('nro_expediente')?.disable(); // Habilita el control
      this.caseForm.get('movil_afectado')?.disable(); // Habilita el control
      this.caseForm.get('subtipo_irregularidad')?.disable(); // Habilita el control
      this.caseForm.get('duracion')?.disable(); // Habilita el control
      this.caseForm.get('deteccion')?.disable(); // Habilita el control
      this.caseForm.get('conclusiones')?.disable(); // Habilita el control
      this.caseForm.get('fecha_inicio')?.disable(); // Habilita el control
      this.caseForm.get('tipo_caso')?.disable(); // Habilita el control
      this.caseForm.get('objetivo')?.disable(); // Habilita el control
      this.caseForm.get('modus_operandi')?.disable(); // Habilita el control
      this.caseForm.get('diagnostico')?.disable(); // Habilita el control
      this.caseForm.get('observaciones')?.disable(); // Habilita el control
      this.caseForm.get('tipo_irregularidad')?.disable(); // Habilita el control
      this.caseForm.get('incidencia')?.disable(); // Habilita el control
      this.caseForm.get('area_apoyo')?.disable(); // Habilita el control
      this.caseForm.get('estado')?.disable(); // Habilita el control
    }
  }
  cargarEntidades() {
      this.entidadBdService.consultarEntidades().subscribe((entidades: any[]) => {
        this.entidades = entidades.map(entidad => IEntidad.fromObject(entidad));
        console.log("cargarEntidades ",this.entidades)
        //this.calcularTotalPaginas();
        this.cdr.detectChanges(); // Forzar la detección de cambios
      });
    }
  loadForm(): void {
    this.caseForm = this.fb.group({
      id: [null],
      nro_expediente: [null, Validators.required],
      movil_afectado: [null, Validators.required],
      subtipo_irregularidad: [null],
      duracion: [null],
      deteccion: [null],
      conclusiones: [null],
      fecha_inicio: [null, Validators.required],
      tipo_caso: [null, Validators.required],
      objetivo: [null],
      modus_operandi: [null],
      diagnostico: [null],
      observaciones: [null],
      investigador: [null],
      //investigador: [null, Validators.required],
      tipo_irregularidad: [null],
      //tipo_irregularidad: [null, Validators.required],
      incidencia: [null],
      area_apoyo: [null],
      estado: [null],
      soporte: [null],
    });
  }

  setForm(): void {
    console.log("setForm",this.user_id, this.casoSelected)
    this.caseForm.reset({
     id: this.casoSelected.id,
     nro_expediente: this.casoSelected.nro_expediente,
     movil_afectado:this.casoSelected.movil_afectado,
      subtipo_irregularidad: this.casoSelected.subtipo_irregularidad,
      duracion: this.casoSelected.duracion,
      deteccion: this.casoSelected.deteccion,
      conclusiones: this.casoSelected.conclusiones,
      fecha_inicio: this.casoSelected.fecha_inicio,
      tipo_caso: this.casoSelected.tipo_caso,
      objetivo: this.casoSelected.objetivo,
      modus_operandi: this.casoSelected.modus_operandi,
      diagnostico: this.casoSelected.diagnostico,
      observacion: this.casoSelected.observacion,
      investigador: this.casoSelected.investigador,
      tipo_irregularidad: this.casoSelected.tipo_irregularidad,
      incidencia: this.casoSelected.incidencia,
      area_apoyo: this.casoSelected.area_apoyo,
      estado: this.casoSelected.estado,
      soporte: this.casoSelected.soporte,
     
    });
    this.cdr.detectChanges();
   // console.log("setForm",this.casoSelected)
  }

  onSubmit() {
    
    console.log("onSubmit",this.caseForm)
    if (this.caseForm.valid) {
      //console.log("********",this.caseForm)
      if(this.caseForm.value['id'] != 0){
        if(this.activeTabId == 3){

          this.caseService.actualizarCasoCerrado_Soporte(
            this.caseForm.value['id'],
            this.caseForm.value['soporte'],
            
         
          )
        }else{

          this.caseService.actualizarCasoInv(
            this.caseForm.value['id'],
            this.caseForm.value['nro_expediente'],
            this.caseForm.value['fecha_inicio'],
            this.caseForm.value['movil_afectado'],
            this.caseForm.value['tipo_caso'],
            this.caseForm.value['tipo_irregularidad'],
            this.caseForm.value['subtipo_irregularidad'],
            this.caseForm.value['objetivo'],
            this.caseForm.value['incidencia'],
            this.caseForm.value['modus_operandi'],
            this.caseForm.value['area_apoyo'],
            this.caseForm.value['deteccion'],
            this.caseForm.value['diagnostico'],
            this.caseForm.value['estado'],
            this.caseForm.value['observacion'],
            this.caseForm.value['soporte'],
            this.caseForm.value['investigador']
         
          )
        }
      }else{
        
        
        this.caseService.insertarCaso_inv(
          this.caseForm.value['nro_expediente'],
          this.caseForm.value['fecha_inicio'],
          this.caseForm.value['movil_afectado'],
          this.caseForm.value['tipo_caso'],
          this.caseForm.value['tipo_irregularidad'],
          this.caseForm.value['subtipo_irregularidad'],
          this.caseForm.value['objetivo'],
          this.caseForm.value['incidencia'],
          this.caseForm.value['modus_operandi'],
          this.caseForm.value['area_apoyo'],
          this.caseForm.value['deteccion'],
          this.caseForm.value['diagnostico'],
          this.caseForm.value['estado'],
          this.caseForm.value['observacion'],
          this.caseForm.value['soporte'],
          this.caseForm.value['investigador']
       
        )
      }
      this.onGoBack();
      this.cdr.detectChanges();
     
    }
    
  }

  onCancel() {
    this.caseForm.reset();
   // this.caseService.clearCase();
  }

  onRegistrarAvances() {
    this.showRegistrarAvances = true;
  }
}