import { ChangeDetectorRef, Component } from '@angular/core';
import { SidenavComponent } from '../../side-nav/side-nav.component';
import { SearchComponent } from '../../search/search.component';
import { RouterModule } from '@angular/router';
import { TableArchivoComponent } from '../table-archivo/table-archivo.component';
import { NgIf } from '@angular/common';
import { AddArchivoComponent } from '../add-archivo/add-archivo.component';
import { Archivo } from '../../models/archivosFactoryMethod.model';


@Component({
  selector: 'app-archivo-main',
  standalone: true,
  imports: [ SidenavComponent, RouterModule, SearchComponent, TableArchivoComponent, NgIf,AddArchivoComponent],
  templateUrl: './archivo-main.component.html',
  styleUrl: './archivo-main.component.css'
})
export class ArchivoMainComponent {
  showAddArchivo = false;
  archivoSelected: Archivo= {id_archivo: "", tipo:   "", descripcion:""} ;
  
constructor( private cdr: ChangeDetectorRef ) { }

ngOnInit(){
 
 

}
  showAddArchivoForm() {
    //this.casoSelected = null
    this.showAddArchivo = true;
    this.cdr.detectChanges();
    console.log("click");
  }

  hideAddArchivoForm() {
    this.showAddArchivo = false;
    this.cdr.detectChanges();
  }
  onArchivoSelected($event: Archivo){
    console.log('Archivo seleccionado desde archivo-main:', $event);
 
    this.showAddArchivo = true;
    this.archivoSelected = $event;
    this.cdr.detectChanges();
  }

}
