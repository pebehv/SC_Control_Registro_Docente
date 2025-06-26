import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-tabs-archivo',
  standalone: true,
  imports: [],
  templateUrl: './tabs-archivo.component.html',
  styleUrl: './tabs-archivo.component.css'
})
export class TabsArchivoComponent {

  constructor(private cdr: ChangeDetectorRef
    
  ) { }
  tabs = {
    serial: 0,
    amonestado: 1
  };

  activeTabId = this.tabs.serial;
  changeTab(tabId: number) {
    console.log("onRowSelect", tabId)

      
      this.activeTabId = tabId;
      //this.onSelected.next(tabId);
    
  }


}
