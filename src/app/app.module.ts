import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UsuarioModel } from './models/usuario.model';
import {
  MatToolbarModule,
  MatCheckboxModule,
  MatListModule,
  } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatStepperModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatListModule,
    MatNativeDateModule],
  providers: [UsuarioModel],
  bootstrap: [AppComponent]
})
export class AppModule { }
