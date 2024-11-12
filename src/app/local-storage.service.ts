import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Guardar un valor en localStorage
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
    console.log(`Item guardado: ${key} = ${value}`);  // Asegúrate de ver en consola que se guardó
  }

  // Obtener un valor de localStorage
  getItem(key: string): string | null {
    const value = localStorage.getItem(key);
    console.log(`Obtenido de localStorage: ${key} = ${value}`);
    return value;
  }

  // Eliminar un valor de localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
    console.log(`Item eliminado: ${key}`);
  }

  // Verificar si un valor existe en localStorage
  containsItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
