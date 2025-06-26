import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenavuser',
  standalone: true,
  imports: [CommonModule, RouterModule],
    templateUrl: './side-nav-user.component.html',
    styleUrl: './side-nav-user.component.css'
})
export class SidenavuserComponent {
  logout() {
    // Implement logout logic here
    console.log('Logging out...');
  }
}