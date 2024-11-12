import { Component } from '@angular/core';
import { RequestService } from '../requestService.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfiles-p',
  templateUrl: './perfiles-p.component.html',
  styleUrl: './perfiles-p.component.css'
})
export class PerfilesPComponent {

  perfil: any[] = [];
 

  constructor(private requestService: RequestService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.obtenerPerfiles();
  }
  
  //MOSTRAR LOS PERFILES
  obtenerPerfiles() {
    this.requestService.verPerfilesP().subscribe(
      (data: any) => {
        console.log(data);
        this.perfil = data.object;
      },
      (error) => {
        console.error('Error al obtener los perfiles:', error);
      }
    );
  }

  crearPerfil(){
    this.router.navigate(['/panel-admin/crear-perfil'])
  }

  borrarPerfil(perfil: any){

    if (perfil.idPerfil){
      this.requestService.eliminarPerfil(perfil.idPerfil, perfil).subscribe(
        (data: any) => {
          console.log('Perfil Eliminado:', data);
          alert('Perfil eliminado correctamente');
          setTimeout(() => {
            window.location.reload();
          }, 200);
        },
        (error) => {
          console.error('Error al eliminar el perfil:', error);
        }
      );
    } else {
      console.error('El ID del perfil es inválido.')
    }

  }

  editarPerfil(perfil: any) {
    perfil.editando = true;
  }

  //GUARDAR EDICION
  guardarPerfil(perfil: any) {
    console.log('ID del perfil a actualizar:', perfil.idPerfil);
    this.requestService.updatePerfil(perfil.idPerfil, perfil).subscribe(
      (data: any) => {
        console.log('Perfil actualizado:', data);
        perfil.editando = false;
        alert('Perfil actualizado correctamente');
      },
      (error) => {
        console.error('Error al actualizar el perfil:', error);
      }
    );
  
  }
  
  //CANCELAR LA EDICION
  cancelarEdicion(perfil: any) {
    perfil.editando = false; 
  }

}
