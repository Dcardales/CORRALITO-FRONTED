import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = 'http://localhost:8060'; //URL Para las Requests

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

// Método para obtener datos protegidos
getProtectedData(): Observable<any> {
  const token = this.localStorageService.getItem('authToken');
  if (!token) {
    console.error('No se encontró el token');
    return throwError(() => new Error('No se encontró el token'));
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<any>(`${this.baseUrl}/protected-endpoint`, { headers })
    .pipe(
      catchError(error => {
        console.error('Error en la petición protegida:', error);
        return throwError(() => new Error(error.message));
      })
    );
}

  // Login Request
  login(username: string, password: string): Observable<any> {
    const loginRequest = { email: username, password };
    return this.http.post<any>(`${this.baseUrl}/auth/login`, loginRequest)
      .pipe(
        catchError(error => {
          console.error('Error de autenticación:', error);
          return throwError(() => new Error('Error de autenticación: ' + error.message));
        }),
        tap((response: any) => {
          console.log('Respuesta de Login:', response);  // Verifica la respuesta del backend
          
          // Cambiar 'accessToken' a 'jwt' según el formato de respuesta del backend
          if (response && response.jwt) {
            this.localStorageService.setItem('authToken', response.jwt);  // Guarda el token usando el servicio
            this.storeUserRoles(response.jwt);  // Guarda los roles
          } else {
            console.error('No se recibió un token en la respuesta');
          }
        })
      );
  }

  // Método para decodificar el token y almacenar los roles
  private storeUserRoles(token: string): void {
    try {
      const decodedToken: any = jwtDecode(token);  // Decodifica el token
      console.log('Decoded Token:', decodedToken);  // Verifica que el token se esté decodificando correctamente

      // Extrae las autoridades (roles) que están como cadena de texto
      const authorities = decodedToken.authorities || '';
      console.log('Authorities:', authorities);  // Verifica que las authorities estén presentes

      // Divide la cadena de autoridades en un array usando coma como separador
      const roles = authorities.split(',');
      console.log('Roles Array:', roles);  // Verifica que los roles estén siendo extraídos correctamente

      // Verifica los roles y almacénalos en localStorage
      if (roles.includes('ROLE_ADMIN')) {
        this.localStorageService.setItem('role', 'ADMIN');
        console.log('Role set to ADMIN');
      } else if (roles.includes('ROLE_USER')) {
        this.localStorageService.setItem('role', 'USER');
        console.log('Role set to USER');
      } else {
        this.localStorageService.setItem('role', 'UNKNOWN');
        console.log('Role set to UNKNOWN');
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }


//USUARIOS  ADMINISTRADORES ---------------

crearAdministrador(adminRequest: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/api/administradores/register`, adminRequest);
}

verAdministradores(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/api/administradores/all`);
}

verAdministradorPorId(id: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/api/administradores/${id}`);
}

updateAdministrador(id: number, adminRequest: any): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/api/administradores/update/${id}`, adminRequest)
    .pipe(
      catchError(error => {
        throw 'Error al actualizar el administrador: ' + error;
      })
    );
}

eliminarAdministrador(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/api/administradores/delete/${id}`)
    .pipe(
      catchError(error => {
        throw 'Error al eliminar el administrador: ' + error;
      })
    );
}



//USUARIOS ---------------

  //Usuarios Requests - Crear
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/usuarios`, usuario);
  }

  //Usuarios Requests - Ver perfiles
  verPerfiles(): Observable<any[]> {
    const url = `${this.baseUrl}/api/v1/usuarios`;
    return this.http.get<any[]>(url);
  }

  verTipoPerfil(usuario: any): Observable<any[]> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/usuarios`, usuario);
  }

  //Usuarios Requests - Editar Usuarios
  updateUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/usuarios/${id}`, usuario)
      .pipe(
        catchError(error => {
          throw 'Error al actualizar el usuario: ' + error;
        })
      );
  }

  //Usuarios - Eliminar usuarios
  eliminarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/usuarios/${id}`, usuario)
      .pipe(
        catchError(error => {
          throw 'Error al actualizar el usuario: ' + error;
        })
      );
  }

  //PERFILES -----------------

  //Crear Perfiles
  crearPerfil(perfil: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/perfiles`, perfil);
  }

  //Ver perfiles
  verPerfilesP(): Observable<any[]> {
    const url = `${this.baseUrl}/api/v1/perfiles`;
    return this.http.get<any[]>(url);
  }

  //Editar perfiles
  updatePerfil(id: number, perfil: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/perfiles/${id}`, perfil)
      .pipe(
        catchError(error => {
          throw 'Error al actualizar el perfil: ' + error;
        })
      );
  }

  //Eliminar perfiles
  eliminarPerfil(id: number, perfil: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/perfiles/${id}`, perfil)
      .pipe(
        catchError(error => {
          throw 'Error al actualizar el perfil: ' + error;
        })
      );
  }

  //PRODUCTOS ------------

  //Crear productos
  crearProducto(producto: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/productos`, producto);
  }

  //Ver productos
  verProducto(): Observable<any[]> {
    const url = `${this.baseUrl}/api/v1/productos`;
    return this.http.get<any[]>(url);
  }

  //Editar productos
  updateProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/productos/${id}`, producto)
      .pipe(
        catchError(error => {
          throw 'Error al actualizar el producto: ' + error;
        })
      );
  }

  //Eliminar productos
  eliminarProducto(id: number, producto: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/productos/${id}`, producto)
      .pipe(
        catchError(error => {
          throw 'Error al actualizar el producto: ' + error;
        })
      );
  }

  //ZONAS -------------

    //Crear zonas
    crearZona(zona: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/api/v1/zonas`, zona);
    }
  
    //Ver zonas
    verZona(): Observable<any[]> {
      const url = `${this.baseUrl}/api/v1/zonas`;
      return this.http.get<any[]>(url);
    }
  
    //Editar zonas
    updateZona(id: number, zona: any): Observable<any> {
      return this.http.put(`${this.baseUrl}/api/v1/zonas/${id}`, zona)
        .pipe(
          catchError(error => {
            throw 'Error al actualizar la zona: ' + error;
          })
        );
    }
  
    //Eliminar zonas
    eliminarZona(id: number, zona: any): Observable<any> {
      return this.http.delete(`${this.baseUrl}/api/v1/zonas/${id}`, zona)
        .pipe(
          catchError(error => {
            throw 'Error al actualizar la zona: ' + error;
          })
        );
    }

  
  //CATEGORIAS -----------


  //Crear Categorías
  crearCategoria(categoria: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/categorias`, categoria);
  }

  //Ver categorias
  verCategoria(): Observable<any[]> {
    const url = `${this.baseUrl}/api/v1/categorias`;
    return this.http.get<any[]>(url);
  }

  //Editar categorias
  updateCategoria(id: number, categoria: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/categorias/${id}`, categoria)
      .pipe(
        catchError(error => {
          throw 'Error al actualizar la categoria: ' + error;
        })
      );
  }

  //Eliminar categorias
  eliminarCategoria(id: number, categoria: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/categorias/${id}`, categoria)
      .pipe(
        catchError(error => {
          throw 'Error al actualizar la categoria: ' + error;
        })
      );
  }
  
}