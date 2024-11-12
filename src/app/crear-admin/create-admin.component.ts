import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../requestService.service'; // Ajusta el nombre de tu servicio

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent {
  
  admin: any = {}; // Inicializa el objeto admin con los datos del formulario
  perfiles = []; // Aquí deberías cargar los perfiles desde el backend o algún servicio
  
  constructor(private requestService: RequestService, private router: Router) {}

  crearAdministrador() {
    this.requestService.crearAdministrador(this.admin).subscribe(
      (response) => {
        console.log('Administrador creado exitosamente', response);
        this.router.navigate(['/panel-admin/administradores']); // Redirige a la lista de administradores
      },
      (error) => {
        console.error('Error al crear administrador', error);
      }
    );
  }

  ngOnInit() {
    // Aquí puedes cargar los perfiles disponibles desde tu API si es necesario
  }
}
