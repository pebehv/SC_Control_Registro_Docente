import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Case } from '../../models/case.model';
import { CaseService } from '../../service/case.service';
import { NgIf } from '@angular/common';
import { IAvance } from '../../models/avance.model';

@Component({
  selector: 'app-form-avances',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-avances.component.html',
  styleUrl: './form-avances.component.css'
})
export class FormAvancesComponent {
  caseForm: any;
  avance: IAvance = new IAvance();
  @Input()casoSelected : Case = new Case();
  @Output() goBack = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    private caseService: CaseService,
    private cdr: ChangeDetectorRef,
  ) {this.loadForm();}

  ngOnInit() {
    console.log("FormAvancesComponent", this.casoSelected)
    
    if(!this.casoSelected ){
          this.casoSelected = new Case();
        }
        this.avance = new IAvance();
    this.getAvance(); 
    

  }
  loadForm(): void {
    this.caseForm = this.fb.group({
      id: [null],
      actividades: [null, ],
      personas: [null, ],
      monto_expuesto: [null],

    });
  }
  setForm(): void {
    this.caseForm.reset({
     id: this.avance.id,
     actividades: this.avance.actividades_realizadas,
     personas:this.avance.personas_involucradas,
     monto_expuesto:this.avance.monto_exp,
     
    });
    this.cdr.detectChanges();
    console.log("setForm",this.caseForm)
  }
  onGoBack() {
    console.log("onGoBack FormCaseComponent")
    this.goBack.emit(); // Emitir el evento
  }

  getAvance(){

    console.log("getAvance")
    this.caseService.buscarCaso_Avance(this.casoSelected.id).subscribe((value:any[]) => {
      if(value.length > 0) {

        this.avance = value[0]
      }
      console.log("array ", value)
      this.setForm(); 
      this.cdr.detectChanges();
    });
  }
  onSubmit() {
    console.log("onSubmit",this.caseForm)
    if (this.caseForm.valid) {
      console.log("********",this.caseForm)
      
      if(this.caseForm.value['id'] != 0 ){
  
          this.caseService.actualizarCasoAvanc(
          this.caseForm.value['id'],
          this.caseForm.value['actividades'],
          this.caseForm.value['personas'],
          this.caseForm.value['monto_expuesto']
       
        )
      }else{
  
        this.caseService.insertarCaso_Avanc(
          this.casoSelected.id,
          this.caseForm.value['actividades'],
          this.caseForm.value['personas'],
          this.caseForm.value['monto_expuesto']
       
        )
      }
    }
    this.onGoBack();
    this.cdr.detectChanges();
    
  }

  onCancel() {

  }

}
