import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { SidenavComponent } from '../../side-nav/side-nav.component';
import { TabEntidadesComponent } from '../tab-entidades/tab-entidades.component';
import { FormEntidadComponent } from '../form-entidad/form-entidad.component';
import { IEntidad } from '../../models/entidad.model';
import { FormBuilder } from '@angular/forms';
import { EntidadBdService } from '../../service/entidad-bd.service';
@Component({
  selector: 'app-add-entidad',
  standalone: true,
  imports: [SidenavComponent, FormEntidadComponent, TabEntidadesComponent],
  templateUrl: './add-entidad.component.html',
  styleUrl: './add-entidad.component.css'
})
export class AddEntidadComponent {
   @Input()entidadSelected : IEntidad = new IEntidad;
     @Output() goBack = new EventEmitter<void>();
     showAddEntidad = false; // Variable de estado 
         constructor(private fb: FormBuilder,
                          private cdr: ChangeDetectorRef ,
                            private entidadService: EntidadBdService
         ){/*this.loadForm();*/}
         ngOnInit() {
           console.log("Entidad seleccionada desde AddEntidad", this.entidadSelected)
         }
         onGoBack() {
          console.log("onGoBack")
          this.goBack.emit(); // Emitir el evento
        }

        hideAddEntidadForm() {
          this.showAddEntidad = false;
          this.onGoBack();
          this.cdr.detectChanges();
        }
  

}
