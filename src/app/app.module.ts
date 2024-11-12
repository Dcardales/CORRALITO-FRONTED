import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TuristaComponent } from './turista/turista.component';
import { CRUDAEComponent } from './crud-ae/crud-ae.component';
import { CreateAdminComponent } from './crear-admin/create-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    TuristaComponent,
    CRUDAEComponent,
    CreateAdminComponent,
    CRUDAEComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
