import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { IPNF } from '../../models/pnf.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PnfService } from '../../service/pnf.service';

@Component({
  selector: 'app-pnf-add',
  templateUrl: './pnf-add.component.html',
  styleUrl: './pnf-add.component.css'
})
export class PnfAddComponent {

  @Output() goBack = new EventEmitter<void>(); // Evento para volver atrás
  @Output() userAdded = new EventEmitter<any>(); // Evento para emitir el nuevo usuario
  @Input()pnfSelected : IPNF = new IPNF();
  loading: boolean = false;
  valForm!: FormGroup;
  dropdownList: any[]  =  [] ; 
  selectedItems : any[] =  [] ; 
  dropdownSettings:  IDropdownSettings =  {} ; 
  pnf: any[] = []
  //pnfSelected : any[] =  [] ; 
  constructor(private fb: FormBuilder,
                  private pnfService: PnfService,
                  private cdr: ChangeDetectorRef  
      )
      {this.loadForm();}

  ngOnInit() {


    if(!this.pnfSelected ){
      this.pnfSelected = new IPNF();
    }
    //console.log("AddUserComponent", this.docenteSelected)
  this.setForm(); // Carga los valores del usuario seleccionado en el formulario

  }

  loadForm(): void {
    this.valForm = this.fb.group({
        id: [null, [Validators.nullValidator]],
        nombre: [null, [Validators.nullValidator]],
        activo: [true, []],
    
        
    });
  }


  setForm(): void {
    this.valForm.reset({
      id: this.pnfSelected.id ,
      nombre: this.pnfSelected.name , 
      activo: this.pnfSelected.activo , 

    });
  }
    // Función para manejar el botón "Volver atrás"
  onGoBack() {
    //console.log("onGoBack")
    this.goBack.emit(); // Emitir el evento
  }

  onSubmit() {
    this.loading = true;
    console.log("****onSubmit****",this.valForm)
    if(this.valForm.value['id'] != 0){
      this.pnfService.actualizarPNF(this.valForm.value['id'], this.valForm.value['nombre'],this.valForm.value['activo']  )
      .subscribe({
      next: (response) => {
        // El registro fue guardado exitosamente
        //this.mensaje = `¡Docente guardado con ID: ${response}!`;
        console.log('persona actualizado con ID:', response);
        this.onGoBack()
        
      },
      error: (err) => {
        // Hubo un error al guardar el registro
        //this.mensaje = `Error al guardar: ${err}`;
        console.error('Error al guardar:', err);
      }
    });

    }else{ //insertar persona nueva 
      console.log('Esto es un insertar persona nueva ')
      this.pnfService.insertarPNF(this.valForm.value['nombre']).subscribe({
      next: (response) => {
        // El registro fue guardado exitosamente
        //this.mensaje = `¡Docente guardado con ID: ${response}!`;
        console.log('persona guardado con ID:', response);  
        this.onGoBack()
      },
      error: (err) => {
    
        console.error('Error al guardar:', err);
      }
    });
     
    }
  }
}
