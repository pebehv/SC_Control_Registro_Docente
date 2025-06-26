import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UsuarioBdService } from '../service/usuario-bd.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SidenavComponent implements OnInit {
  rol: number | null = null; // Almacenaremos el rol del usuario 

  constructor(private router: Router, private usuarioBdService: UsuarioBdService) { }

  ngOnInit(): void {
    this.rol = this.usuarioBdService.getCurrentUserRole();
    console.log("ROl DEL USUARIO SIDENAV:", this.rol);
  }

  logout() {
    // Implementar la lógica de cierre de sesión
    this.usuarioBdService.logout();
    this.router.navigate(['/login']);
    console.log('Logging out...');
  }
}
