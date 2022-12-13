import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {UsuarioRoutingModule} from "./usuario-routing.module";
import {CommonModule} from "@angular/common";
import { UsuarioComponent } from './usuario.component';
import {UsuarioPageComponent} from "../../core/usuario-page/usuario-page.component";


export let validateAndFlattenComponentImports = undefined;


@NgModule({
  declarations: [
    UsuarioComponent,
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class usuarioModule {


}
