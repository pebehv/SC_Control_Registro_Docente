import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true, // Marca el componente como standalone
  imports: [FormsModule], // Importa FormsModule para usar ngModel
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string = '';

  @Output() searchEvent = new EventEmitter<string>();

  onSearch() {
    this.searchEvent.emit(this.searchQuery);
  }
}