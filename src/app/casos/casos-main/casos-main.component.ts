import { ChangeDetectorRef, Component } from '@angular/core';
import { SidenavComponent } from '../../side-nav/side-nav.component';
import { TableCasosComponent } from '../table-casos/table-casos.component';
import { SearchComponent } from '../../search/search.component';
import { Router, RouterModule } from '@angular/router';
import { UsuarioBdService } from '../../service/usuario-bd.service';
import { NgIf } from '@angular/common';
import { AddCasoComponent } from "../add-caso/add-caso.component";
import { Case } from '../../models/case.model';
@Component({
  selector: 'app-casos-main',
  standalone: true,
  imports: [SidenavComponent, TableCasosComponent, SearchComponent, RouterModule, NgIf, AddCasoComponent],
  templateUrl: './casos-main.component.html',
  styleUrl: './casos-main.component.css'
})
export class CasosMainComponent {
  rol: number | null = null; // Almacenaremos el rol del usuario 
  casoSelected: Case = new Case;
  showAddCase = false;
  constructor(private router: Router, private usuarioBdService: UsuarioBdService, private cdr: ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.rol = this.usuarioBdService.getCurrentUserRole();
    console.log("ROl DEL USUARIO CASOS MAIN:", this.rol);
  }
  showAddCaseForm() {
    this.casoSelected = new Case
    this.showAddCase = true;
    this.cdr.detectChanges();
    console.log("click");
  }
  onCaseSelected($event: Case){
    console.log('Usuario seleccionado desde case-main:', $event);
    // Aquí puedes agregar la lógica para manejar el evento de selección del usuario
    this.showAddCase = true;
    this.casoSelected = $event;
    this.cdr.detectChanges();
  }
  hideAddCaseForm() {
    this.showAddCase = false;
    this.cdr.detectChanges();
  }

}
