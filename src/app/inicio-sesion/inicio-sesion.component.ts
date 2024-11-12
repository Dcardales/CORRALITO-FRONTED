import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../requestService.service';  // Asegúrate de importar el servicio

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  username: string = '';  // Email del usuario
  password: string = '';  // Contraseña del usuario

  constructor(private requestService: RequestService, private router: Router) {}

  login(): void {
    // Llama al servicio para autenticar
    this.requestService.login(this.username, this.password).subscribe({
      next: (response) => {
        const role = localStorage.getItem('role');
        console.log('Role después del login:', role);  // Verifica que el rol esté presente

        if (role === 'ADMIN') {
          this.router.navigate(['/panel-admin']);
        } else if (role === 'USER') {
          this.router.navigate(['/panel-usuario']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.error('Error de autenticación:', err);
      }
    });
  }

  register(): void {
    this.router.navigate(['/registro']);
  }
}

