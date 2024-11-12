import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../requestService.service';

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrl: './crear-perfil.component.css'
})
export class CrearPerfilComponent {

  perfil: any = {};

  constructor(private router: Router, private requestService: RequestService) { }

  crearPerfil() {
    // Llama al método para crear un usuario
    this.requestService.crearPerfil(this.perfil).subscribe(
      (response) => {
        console.log('Perfil creado correctamente:', response);
        setTimeout(() => {
          this.router.navigate(['/panel-admin/perfiles']);
        }, 100);
      },
      (error) => {
        console.error('Error al crear perfil:', error);       
      }
    );
  }

}
