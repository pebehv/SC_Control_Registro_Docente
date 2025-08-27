import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocenteService } from '../../service/docente.service';
import { IDocente } from '../../models/docente.model';
import {  IDropdownSettings  }  from  'ng-multiselect-dropdown' ;
import { PnfService } from '../../service/pnf.service';


@Component({
  selector: 'app-docente-add',
  //imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './docente-add.component.html',
  styleUrl: './docente-add.component.css'
})
export class DocenteAddComponent {
  @Output() goBack = new EventEmitter<void>(); // Evento para volver atrás
  @Output() userAdded = new EventEmitter<any>(); // Evento para emitir el nuevo usuario
  @Input()docenteSelected : IDocente = new IDocente();
  loading: boolean = false;
  valForm!: FormGroup;
  dropdownList: any[]  =  [] ; 
  selectedItems : any[] =  [] ; 
  dropdownSettings:  IDropdownSettings =  {} ; 
  pnf: any[] = []
  pnfSelected : any[] =  [] ; 
  img: any = null
  imageFile: any = null
  img_id: number = 0;
  img_bool: boolean = false;
  tipo_mime: string = '';
  
    constructor(private fb: FormBuilder,
                private docenteService: DocenteService,
                private pnfService: PnfService,
                private cdr: ChangeDetectorRef  
    )
    {this.loadForm();}
    ngOnInit() {
    /*
    this.dropdownList  =  [ 
      {  item_id : 1 ,  item_text : 'Mumbai'  } , 
      {  item_id : 2 ,  item_text : 'Bangaluru'  } , 
      {  item_id : 3 ,  item_text : 'Pune'  } , 
      {  item_id : 4 ,  item_text : 'Navsari'  } , 
      {  item_id : 5 ,  item_text : 'Nueva Delhi'  } 
    ] ; 
    this.selectedItems  =  [ 
      {  item_id : 3 ,  item_text : 'Pune'  } , 
      {  item_id : 4 ,  item_text : 'Navsari'  } 
    ] ; */
    this.dropdownSettings   =  { 
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    } ; 

      if(!this.docenteSelected ){
        this.docenteSelected = new IDocente();
      }else{
        this.consultarImage(this.docenteSelected.docente)
      }
      //console.log("AddUserComponent", this.docenteSelected)
    this.setForm(); // Carga los valores del usuario seleccionado en el formulario
    this.getPNF();
    }
    
    loadForm(): void {
      this.valForm = this.fb.group({
          id: [null, [Validators.nullValidator]],
          docente: [null, [Validators.nullValidator]],
          apellido: ["no", []],
          nombre: [null, [Validators.required]],
          ci: [null, []],
          email: [null, []],
          tlf: [null, ],
          fechaNac: [null,],
          sexo: [null, []],
          pnf: [null, []],
          carga_acad: [null, []],
          carga_resp: [null, []],
          observ: [null, []],
          //espec: [null, []],
          trayecto: [null, []],
          sede: [null, []],
          profesion: [null, []],
          estado: [null, []],
          imagen_data: [null, []],
          myDropdownControl: [null, []],
          
      });
    }
  

    setForm(): void {
      this.valForm.reset({
        id: this.docenteSelected.id ,
        docente: this.docenteSelected.docente , // id de persona 
        apellido: 'no',
        nombre: this.docenteSelected.nombre,
        ci: this.docenteSelected.ci,
        email: this.docenteSelected.email,
        tlf: this.docenteSelected.tlf,
        fechaNac: this.docenteSelected.fechaNac,
        sexo: this.docenteSelected.sexo,
        pnf: this.docenteSelected.pnf,
        carga_acad: this.docenteSelected.carga_acad,
        trayecto: this.docenteSelected.trayecto,
        sede: this.docenteSelected.sede,
        profesion: this.docenteSelected.profesion,
        imagen_data: this.docenteSelected.imagen_data,
        estado: this.docenteSelected.estado,
        
      });
    }
    
    // Función para manejar el botón "Volver atrás"
    onGoBack() {
      //console.log("onGoBack")
      this.goBack.emit(); // Emitir el evento
    }
    
  // Función para manejar el envío del formulario
  onSubmit() {
    this.loading = true;
    console.log("****onSubmit****",this.valForm)
    if(this.valForm.value['id'] != 0){
      console.log("actualizar********",this.valForm)

      this.docenteService.actualizarPersona(
        this.valForm.value['docente'],
        this.valForm.value['nombre'],
        'no',
        this.valForm.value['ci'],
        this.valForm.value['email'],
        this.valForm.value['tlf'],
        this.valForm.value['fechaNac'],
        this.valForm.value['sexo'],
     
      ).subscribe({
      next: (response) => {
        // El registro fue guardado exitosamente
        //this.mensaje = `¡Docente guardado con ID: ${response}!`;
        console.log('persona actualizado con ID:', response);
        
        this.insertarDocente(1,this.docenteSelected.docente, 
          this.valForm.value['carga_acad'],
          this.valForm.value['trayecto'],
          this.valForm.value['sede'],
          this.valForm.value['profesion'],
          this.valForm.value['carga_resp'],
          this.valForm.value['observ'],
          this.valForm.value['estado']  )   
        
      },
      error: (err) => {
        // Hubo un error al guardar el registro
        //this.mensaje = `Error al guardar: ${err}`;
        console.error('Error al guardar:', err);
      }
    });
    }else{ //insertar persona nueva 
      console.log('Esto es un insertar persona nueva ')
      this.docenteService.insertarPersona(
        0, 
        this.valForm.value['nombre'],
        'no',
        this.valForm.value['ci'],
        this.valForm.value['email'],
        this.valForm.value['tlf'],
        this.valForm.value['fechaNac'],
        this.valForm.value['sexo'],
      ).subscribe({
      next: (response) => {
        // El registro fue guardado exitosamente
        //this.mensaje = `¡Docente guardado con ID: ${response}!`;
        console.log('persona guardado con ID:', response);
        
        this.insertarDocente(0,response.idd, 
          this.valForm.value['carga_acad'],
          this.valForm.value['trayecto'],
          this.valForm.value['sede'],
          this.valForm.value['profesion'],
          this.valForm.value['carga_resp'],
          this.valForm.value['observ'],
          this.valForm.value['estado']  )     
        
      },
      error: (err) => {
        // Hubo un error al guardar el registro
        //this.mensaje = `Error al guardar: ${err}`;
        console.error('Error al guardar:', err);
      }
    });
      /*this.docenteService.insertarPersona(
        0, 
        this.valForm.value['nombre'],
        'no',
        this.valForm.value['ci'],
        this.valForm.value['email'],
        this.valForm.value['tlf'],
        this.valForm.value['fechaNac'],
        this.valForm.value['sexo'],
     
      ).subscribe((value: number)=>{
        console.log('el subscribe inserte a la persona ', value)

        this.insertarDocente(0,value, 
          this.valForm.value['carga_acad'],
          this.valForm.value['trayecto'],
          this.valForm.value['sede'],
          this.valForm.value['profesion'],
          this.valForm.value['estado']  )        
      })
      */
    }
  }

  insertarDocente(st: number, docente:number,  
    carga_acad: number,
    trayecto: string,
    sede:string,
    profesion:string,
    carga_resp:string,
    observ:string,
    estado:boolean){
      // Llama al servicio e inserta los datos
    this.docenteService.insertarDocente(st, docente, carga_acad,trayecto,sede,profesion,carga_resp,observ,  estado).subscribe({
      next: (response) => {
        // El registro fue guardado exitosamente
        console.log('Docente guardado con ID:', response);
        if(this.img_bool){
          this.insertarImg(docente)
        }
  
        this.onGoBack();
        this.cdr.detectChanges();
      },
      error: (err) => {
        // Hubo un error al guardar el registro
        console.error('Error al guardar:', err);
      }
    });
    /*this.docenteService.insertarDocente(
      st, docente, carga_acad,trayecto,sede,profesion,estado
    ).subscribe((valu:any)=>{
      console.log('se ingreso el docente insertarDocente ' , valu )
      /*if(this.img_bool){
        this.insertarImg(docente)
      }*

      this.onGoBack();
      this.cdr.detectChanges();
    })*/

  }
  
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  
  getPNF(){

    console.log("refresh")
    this.pnfService.consultarPNF((rows:any[]) => {
      this.pnf = rows;
      console.log(rows);
      this.cdr.detectChanges();
    });
  }
  sendImage($event: any){
    //console.log("sen img", this.valForm.value)
    //let imageFile: any = null;
    this.img_bool = true;
    const reader = new FileReader();
    if ($event.target.files && $event.target.files.length > 0) {
      const file = $event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageFile = {
          filename: file.name,
          filetype: file.type,
          value: encodeURIComponent((reader.result as string).split(',')[1])
        };
      //console.log('image', imageFile)
      
      //this.getImages(imageFile)
      this.getImages('', 'image/png', this.imageFile.value)
      }
    }
  }
  
  insertarImg(docente:number){
    

    this.docenteService.insertarImg(this.img_id, this.tipo_mime, docente, this.imageFile).subscribe({
      next: (response) => {
        // El registro fue guardado exitosamente
        console.log('registro de imagen exitoso')
      },
      error: (err) => {
        // Hubo un error al guardar el registro
        console.error('Error al guardar imagen:', err);
      }
    });
  }
  consultarImage(docente: number){
    this.docenteService.consultarImage(docente).
      subscribe((value:any)=>{
        if(value){
          this.img_id = value.id;
         //console.log('consultarImage', value)
         this.getImages(value.nombre_imagen, value.tipo_mime, value.imagen_data);
       }
      })

  }

  getImages(nombre_imagen: string, tipo_mime: string, imagen_data:string) {
    const decodedString = decodeURIComponent(imagen_data);
    const mimeType = tipo_mime; // You'd need to know the original MIME type
    const dataUrl = `data:${mimeType};base64,${imagen_data}`;
    this.img = dataUrl
    this.tipo_mime =  mimeType;
    this.cdr.detectChanges()
    /*return this.img.map((attch: any) => {
      return {
        src: attch.url,
        caption: attch.caption || this.img.text,
        thumb: attch.url,
        downloadUrl: attch.url
      };
    });*/
  }
  /*getImages(imageFile:any) {
    const decodedString = decodeURIComponent(imageFile.value);
    const mimeType = 'image/png'; // You'd need to know the original MIME type
    const dataUrl = `data:${mimeType};base64,${imageFile.value}`;
    this.img = dataUrl
    this.cdr.detectChanges()
    /*return this.img.map((attch: any) => {
      return {
        src: attch.url,
        caption: attch.caption || this.img.text,
        thumb: attch.url,
        downloadUrl: attch.url
      };
    });
  */
}
