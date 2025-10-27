//import { Component, EventEmitter, Output } from '@angular/core';

import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../models/user.model';
import { UsuarioBdService } from '../service/usuario-bd.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule], // Importa FormsModule para usar ngModel
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  @Output() goBack = new EventEmitter<void>(); // Evento para volver atrás
  @Output() userAdded = new EventEmitter<any>(); // Evento para emitir el nuevo usuario
  @Input()usuarioSelected: IUser = new IUser();
  
  valForm!: FormGroup;
  
 get rolTexto(): string {
  return this.usuarioSelected.rol === 1 ? 'Administrador' : 'Investigador';
} 

  constructor(private fb: FormBuilder,
              private usuarioBdService: UsuarioBdService,
              private cdr: ChangeDetectorRef  
  )
  {this.loadForm();}
  ngOnInit() {
    if(!this.usuarioSelected ){
      this.usuarioSelected = new IUser();
    }
    console.log("AddUserComponent", this.usuarioSelected)
    this.setForm(); // Carga los valores del usuario seleccionado en el formulario
  }
  
  loadForm(): void {
    this.valForm = this.fb.group({
        id: [null, [Validators.nullValidator]],
        apellido: [null, [Validators.required, Validators.required]],
        nombre: [null, [Validators.required]],
        cedula: [null, []],
        correo: [null, []],
        contrasena: [null, []],
        usuario: [null, [Validators.required]],
        rol: [1, []],
       
    });
  }

  setForm(): void {
    this.valForm.reset({
      id: this.usuarioSelected.id ,
      apellido: this.usuarioSelected.apellido,
      nombre: this.usuarioSelected.nombre,
      cedula: this.usuarioSelected.cedula,
      correo: this.usuarioSelected.correo,
      contrasena: this.usuarioSelected.contrasena,
      usuario: this.usuarioSelected.usuario,
      //rol: this.usuarioSelected.rol,
     
    });
  }
  
  // Función para manejar el botón "Volver atrás"
  onGoBack() {
    console.log("onGoBack")
    this.goBack.emit(); // Emitir el evento
  }

  // Función para manejar el envío del formulario
  onSubmit() {
    console.log("********",this.valForm)
    if(this.valForm.value['id'] != 0){

      this.usuarioBdService.actualizarUsuario(
        this.valForm.value['id'],
        this.valForm.value['nombre'],
        this.valForm.value['apellido'],
        this.valForm.value['cedula'],
        this.valForm.value['correo'],
        this.valForm.value['usuario'],
        this.valForm.value['contrasena'],
        this.valForm.value['rol'],
     
      )
    }else{

      this.usuarioBdService.insertarUsuario(
        this.valForm.value['nombre'],
        this.valForm.value['apellido'],
        this.valForm.value['cedula'],
        this.valForm.value['correo'],
        this.valForm.value['usuario'],
        this.valForm.value['contrasena'],
        this.valForm.value['rol'],
     
      )
    }
    this.onGoBack();
    this.cdr.detectChanges();
    
  }
}
