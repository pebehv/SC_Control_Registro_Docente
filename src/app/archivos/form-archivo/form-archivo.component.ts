import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchivosService } from '../../service/archivos.service';
import { Archivo, SerialEquiposRobados, Amonestado } from '../../models/archivosFactoryMethod.model'; 

@Component({
  selector: 'app-form-archivo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-archivo.component.html',
  styleUrl: './form-archivo.component.css'
})
export class FormArchivoComponent{
  @Output() goBack = new EventEmitter<void>();
  
  
 
  archivoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private archivosService: ArchivosService,
    private cdr: ChangeDetectorRef
  ) {}

  
  tabs = {
    serial: 0,
    amonestado: 1
  };

  activeTabId = this.tabs.serial;

  ngOnInit(): void {
    this.archivoForm = this.fb.group({
      tipo: ['serial', Validators.required], // Valor por defecto
      serial: ['', Validators.required],
      modelo: ['', Validators.required],
      observacion: ['', Validators.required],
      marca: [''],
      caso: [null], 
      descripcion: [null], 
      cedula: [null], 
      nombre: [''], 
      apellido: [''], 
      empresa: [''] 
        });
        this.archivoForm.get('tipo')?.valueChanges.subscribe((tipo) => {
          this.activeTabId = tipo === 'serial' ? this.tabs.serial : this.tabs.amonestado;
        });
        
  }



  changeTab(tabId: number) {
    this.activeTabId = tabId;
    // Actualizar el valor del select
    const tipo = tabId === this.tabs.serial ? 'serial' : 'amonestado';
    this.archivoForm.get('tipo')?.setValue(tipo, { emitEvent: false });
  }




  onSubmit() {
    if (this.archivoForm.invalid) {
      console.error('Formulario inválido');
      return;
    }

    const formValue = this.archivoForm.value;

    // Crear el archivo según el tipo seleccionado
    if (formValue.tipo === 'serial') {
      const serialEquipo = new SerialEquiposRobados(
        this.generateId(), 
        formValue.caso,
        'SerialEquiposRobados', 
        formValue.descripcion,
        formValue.serial,
        formValue.marca, 
        formValue.modelo,
        formValue.observacion
      );
      this.archivosService.insertarSerialEquipo(
        serialEquipo.id_archivo,
        serialEquipo.caso,
        serialEquipo.tipo,
        serialEquipo.descripcion,
        serialEquipo.serial,
        serialEquipo.tipoEquipo,
        serialEquipo.modelo,
        serialEquipo.observaciones
      );
    } else if (formValue.tipo === 'amonestado') {
      const amonestado = new Amonestado(
        this.generateId(), 
        formValue.caso,
        'Amonestado', 
        formValue.descripcion,
        formValue.cedula,
        formValue.nombre,
        formValue.apellido,
        formValue.empresa
      );
      this.archivosService.insertarAmonestado(
        amonestado.id_archivo,
        amonestado.caso,
        amonestado.tipo,
        amonestado.descripcion,
        amonestado.cedula,
        amonestado.nombre,
        amonestado.apellido,
        amonestado.empresa
      );
    }

    console.log('Archivo insertado correctamente');
    this.archivoForm.reset(); // Limpiar el formulario 
    this.onGoBack();
    this.cdr.detectChanges();
  }

  onGoBack() {
    console.log("onGoBack FormCaseComponent")
    this.goBack.emit(); 
  }

  onCancel(){
    this.onGoBack();
    this.cdr.detectChanges();
  }
  // generacion del id del archivo
  private generateId(): string {
    return 'ARCH-' + Math.random().toString(36).substr(2, 9);
  }



  
}