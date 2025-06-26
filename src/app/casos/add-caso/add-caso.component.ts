import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { SidenavComponent } from '../../side-nav/side-nav.component';
import { FormCaseComponent } from '../form-case/form-case.component';
import { TabsComponent } from '../tabs/tabs.component';
import { Case } from '../../models/case.model';
import { FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CaseService } from '../../service/case.service';
import { FormAvancesComponent } from '../form-avances/form-avances.component';
import { FormCerrarCasoComponent } from '../../cerrar-reabrir/form-cerrar-caso/form-cerrar-caso.component';



@Component({
  selector: 'app-add-caso',
  standalone: true,
  imports: [SidenavComponent, FormCaseComponent, TabsComponent, RouterModule, CommonModule,
    FormAvancesComponent, FormCerrarCasoComponent
  ],
  templateUrl: './add-caso.component.html',
  styleUrl: './add-caso.component.css'
})
export class AddCasoComponent {
  @Output() caseAdded = new EventEmitter<any>();
  @Input()casoSelected : Case = new Case;
  @Output() goBack = new EventEmitter<void>();
  activeTabId = 0
  showAddUser = false; // Variable de estado para controlar la visibilidad

    
      constructor(private fb: FormBuilder,
                  private cdr: ChangeDetectorRef ,
                  private caseService: CaseService 
      ){/*this.loadForm();*/}
      ngOnInit() {
        console.log("AddCaseComponent", this.casoSelected)
      }

      onGoBack() {
        console.log("onGoBack AddCasoComponent")
        this.goBack.emit(); // Emitir el evento
      }
        // Función para volver a la tabla
      hideAddUserForm() {
        this.showAddUser = false;
        this.onGoBack();
        this.cdr.detectChanges();
      }
      
      onSelected($event: number){
        console.log('onSelected', $event);
        // Aquí puedes agregar la lógica para manejar el evento de selección del usuario
       if(this.casoSelected){

         this.activeTabId = $event;
       }
       
        this.cdr.detectChanges();
      }

}
