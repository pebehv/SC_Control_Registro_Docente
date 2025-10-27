import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersMainComponent } from './users-main/users-main.component';
import { SidenavComponent } from './side-nav/side-nav.component';
import { UsuarioBdService } from './service/usuario-bd.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sistema de Control de Registro de Docente';
  usuarios: any[] = [];
  constructor(
    private usuarioBdService: UsuarioBdService,

  ) {} 

  ngOnInit() {

    this.usuarioBdService.consultarUsuarios((rows) => {
      this.usuarios = rows;
      console.log(this.usuarios);
    });

    

  }

}
