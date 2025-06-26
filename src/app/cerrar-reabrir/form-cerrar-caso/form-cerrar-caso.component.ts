import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Case } from '../../models/case.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CaseService } from '../../service/case.service';
import { ICasoCerrado } from '../../models/caso_cerrado.model';

@Component({
  selector: 'app-form-cerrar-caso',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-cerrar-caso.component.html',
  styleUrl: './form-cerrar-caso.component.css'
})
export class FormCerrarCasoComponent {
caseForm: any;
caso_cerrado: ICasoCerrado = new ICasoCerrado();
  @Input()casoSelected : Case = new Case();
  @Output() goBack = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    private caseService: CaseService,
    private cdr: ChangeDetectorRef,
  ) {this.loadForm();}

  ngOnInit() {
    console.log("Form Case FormCerrarCasoComponent", this.casoSelected)
    
    if(!this.casoSelected ){
          this.casoSelected = new Case();
        }
        this.caso_cerrado = new ICasoCerrado();
        console.log("caso_cerrado", this.caso_cerrado)
        this.getCasoCerrado(); 

  }
    loadForm(): void {
      this.caseForm = this.fb.group({
        id: [null],
        observacion: [null, ],
        conclusion: [null, ],
        recomendacion: [null],

      });
    }
    setForm(): void {
      this.caseForm.reset({
      id: this.caso_cerrado.id || 0,
      observacion: this.caso_cerrado.observ,
      conclusion:this.caso_cerrado.conclusion,
      recomendacion:this.caso_cerrado.recomend,
      
      });
      this.cdr.detectChanges();
      console.log("setForm",this.caseForm)
    }
    onGoBack() {
      console.log("onGoBack FormCerrarCasoComponent")
      this.goBack.emit(); // Emitir el evento
    }
  

    getCasoCerrado(){

      console.log("getAvance")
      this.caseService.buscarCaso_Cerrado(this.casoSelected.id).subscribe((value:any[]) => {
       if(value.length > 0) 
        {

          this.caso_cerrado = value[0]
        }
        console.log("array ", value)
        this.setForm(); 
        this.cdr.detectChanges();
      });
    }
  onSubmit(){
    if (this.caseForm.valid) {
      console.log("********",this.caseForm)
      
      if(this.caseForm.value['id'] != 0 ){
  
          this.caseService.actualizarCasoCerrado(
          this.caseForm.value['id'],
          this.caseForm.value['conclusion'],
          this.caseForm.value['recomendacion'],
          this.caseForm.value['observacion']
       
        )
      }else{
  
        this.caseService.insertarCaso_Cerrado(
          this.casoSelected.id,
          this.caseForm.value['conclusion'],
          this.caseForm.value['recomendacion'],
          this.caseForm.value['observacion']
       
        )
      }
    }
    this.onGoBack();
    this.cdr.detectChanges();
  }

  onCancel() {

  }

}
