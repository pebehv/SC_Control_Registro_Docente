import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Case } from '../../models/case.model';
import { UsuarioBdService } from '../../service/usuario-bd.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  @Output() onSelected: EventEmitter<any> = new EventEmitter<any>();
  @Input()casoSelected : Case = new Case();
  rol: number |null = null;
  tabs = {
    caso: 0,
    avance: 1,
    cerrar: 2,
    reabrir: 3,
  };
activeTabId = this.tabs.caso;
  constructor(private cdr: ChangeDetectorRef,
    private usuarioBdService: UsuarioBdService
  ) { }
  
  ngOnInit() {
      
    this.rol = this.usuarioBdService.getCurrentUserRole();
    this.cdr.detectChanges();

  }
   

  changeTab(tabId: number) {
    console.log("onRowSelect", tabId)
    if(this.casoSelected){
      
      this.activeTabId = tabId;
      this.onSelected.next(tabId);
    }
  }
}
