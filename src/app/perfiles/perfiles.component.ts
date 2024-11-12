import { Component, OnInit } from '@angular/core';
import { RequestService } from '../requestService.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrl: './perfiles.component.css'
})
export class PerfilesComponent implements OnInit {

  usuarios: any[] = [];
  perfil: any[] = [];
  usuariosFiltrados: any[] = [];
  filtroNombreUsuario: string = '';
 

  constructor(private requestService: RequestService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.obtenerPerfiles();
    this.cargarPerfiles();
  }
  

  cargarPerfiles(){
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
  
  obtenerPerfiles() {
    this.requestService.verPerfiles().subscribe(
      (data: any) => {
        console.log(data);
        this.usuarios = data.object;
        this.usuariosFiltrados = [...this.usuarios];
      },
      (error) => {
        console.error('Error al obtener los perfiles:', error);
      }
    );
  }

  //FILTRAR POR APELLIDO
  filtrarPorApellido(event: any) {
    const apellido = event.target.value;
    this.usuarios = this.usuariosFiltrados.filter(usuario =>
      usuario.apellidos.toLowerCase().includes(apellido.toLowerCase())
    );
  }

  //CREAR USUARIO
  crearUsuario(){
    this.router.navigate(['/panel-admin/crear-usuario'])
  }

  //EDITAR
  editarUsuario(usuario: any) {
    usuario.editando = true;
  }

  //GUARDAR EDICION
  guardarCambios(usuario: any) {
    if (usuario.idUsuario){
    this.requestService.updateUsuario(usuario.idUsuario, usuario).subscribe(
      (data: any) => {
        console.log('Usuario actualizado:', data);
        usuario.editando = false; 
        alert('Usuario actualizado correctamente');
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  } else {
    console.error('El ID del usuario es inválido.')
  }
  }

  //CAMBIAR CONTRASEÑA
  
  cambiarContrasena(usuario: any){
    usuario.editar = true;
  }

  cancelarCambioC(usuario: any){
    usuario.editar = false;
  }

  //GUARDAR CONTRASEÑA NUEVA
  guardarCambiosC(usuario: any) {
    if (usuario.idUsuario) {
      if (usuario.contrasenaAnterior === usuario.contrasena) {

        usuario.contrasena = usuario.nuevaContrasena;

        this.requestService.updateUsuario(usuario.idUsuario, usuario).subscribe(
          (data: any) => {
            console.log('Usuario actualizado:', data);
            usuario.editando = false;
            usuario.contrasenaAnterior = '';
            usuario.nuevaContrasena = '';
            alert('Contraseña actualizada correctamente');
          },
          (error) => {
            console.error('Error al actualizar el usuario:', error);
            alert('No se pudo actualizar la contraseña');
          }
        );
      } else {
        alert('La contraseña anterior no coincide.');
      }
    } else {
      alert('El ID del usuario es inválido.');
    }
  }

  //CANCELAR LA EDICION
  cancelarEdicion(usuario: any) {
    usuario.editando = false;
  }

  borrarUsuario(usuario: any){
    if (usuario.idUsuario){
      this.requestService.eliminarUsuario(usuario.idUsuario, usuario).subscribe(
        (data: any) => {
          console.log('Usuario Eliminado:', data);
          alert('Usuario eliminado correctamente');
          setTimeout(() => {
            window.location.reload();
          }, 200);
        },
        (error) => {
          console.error('Error al eliminar el usuario:', error);
        }
      );
    } else {
      console.error('El ID del usuario es inválido.')
    }

  }
  
  

}
