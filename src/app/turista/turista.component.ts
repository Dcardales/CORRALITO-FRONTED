import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RequestService } from '../requestService.service';

@Component({
  selector: 'app-turista',
  templateUrl: './turista.component.html',
  styleUrl: './turista.component.css'
})
export class TuristaComponent {

  zona: any[] = [];
  producto: any[] = [];
  nombreProducto: string = '';
  zonaSeleccionada: any;
  productosFiltrados: any[] = [];
  mostrarResultados = false;

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private router: Router, private requestService: RequestService, private route: ActivatedRoute){}


  //BUSCAR LOS PRODUCTOS
  buscar() {
    if (this.nombreProducto && this.zonaSeleccionada) {
      this.productosFiltrados = this.producto.filter(producto =>
        producto.nombreProducto.toLowerCase().includes(this.nombreProducto.toLowerCase()) &&
        producto.zona.idZona === this.zonaSeleccionada.idZona
      );
      this.mostrarResultados = true;
    }
  }

  //PARA LOS FILTROS
  sortData(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.producto.sort((a, b) => {
      const aValue = this.getNestedValue(a, column);
      const bValue = this.getNestedValue(b, column);

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  getNestedValue(obj: any, path: string) {
    return path.split('.').reduce((value, key) => value[key], obj);
  }

  //PARA CERRAR LA VENTANA EMERGENTE
  cerrarModal() {
    this.mostrarResultados = false;
  }

}
