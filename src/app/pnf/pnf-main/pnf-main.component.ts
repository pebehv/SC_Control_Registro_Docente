import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-pnf-main',
  templateUrl: './pnf-main.component.html',
  styleUrl: './pnf-main.component.css'
})
export class PnfMainComponent {
  showAddDocente = false;

  
  constructor(
    //private usuarioBdService: UsuarioBdService,
      private cdr: ChangeDetectorRef  
    ) {} 

  
  showAddDocenteForm() {
    //this.dataSelected = new IDocente;
    this.showAddDocente = true;
    this.cdr.detectChanges();
    console.log("click");
  }
}
