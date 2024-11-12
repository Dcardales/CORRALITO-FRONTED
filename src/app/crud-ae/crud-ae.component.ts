import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { RequestService } from '../requestService.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-crud-ae',
  templateUrl: './crud-ae.component.html',
  styleUrls: ['./crud-ae.component.css'], // Corregido el nombre del archivo de estilos
  animations: [
    trigger('submenuAnimation', [
      state('open', style({
        maxHeight: '200px',
        overflow: 'hidden'
      })),
      state('closed', style({
        maxHeight: '0',
        overflow: 'hidden'
      })),
      transition('open => closed', animate('200ms ease-out')),
      transition('closed => open', animate('200ms ease-in'))
    ]),
    trigger('dropdownAnimation', [
      state('open', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('closed', style({
        opacity: 0,
        transform: 'translateY(-10px)'
      })),
      transition('open => closed', animate('200ms ease-out')),
      transition('closed => open', animate('200ms ease-in'))
    ])
  ]
})
export class CRUDAEComponent {

  showBackgroundImage: boolean = true;

  constructor(private router: Router, private requestService: RequestService, private route: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showBackgroundImage = this.router.url === '/panel-admin';
      }
    });
  }

  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');
    
    if (sidebar && content) {
      if (this.isSidebarCollapsed) {
        sidebar.classList.add('collapsed');
        content.classList.add('collapsed');
      } else {
        sidebar.classList.remove('collapsed');
        content.classList.remove('collapsed');
      }
    }
  }

  ngOnInit() {
    // Cualquier lógica de inicialización, si es necesario
  }

  //PARTE DEL ADMIN

  // Mirar y editar administradores
  verAdministradores() {
    this.router.navigate(['/panel-admin/administradores']);
  }

}
