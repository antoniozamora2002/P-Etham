import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './main-page/header/header.component';
import { FooterComponent } from './main-page/footer/footer.component';
import {RouterModule} from "@angular/router";
import {FooterPrincipalComponent} from "./pagina-principal/footer-principal/footer-principal.component";
import {HeaderPrincipalComponent} from "./pagina-principal/header-principal/header-principal.component";
import {PaginaPrincipalComponent} from "./pagina-principal/pagina-principal.component";



@NgModule({
  declarations: [
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    FooterPrincipalComponent,
    HeaderPrincipalComponent,
    PaginaPrincipalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoreModule { }
