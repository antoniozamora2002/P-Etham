import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {PrincipalRoutingModule} from "./principal-routing.module";
import {CommonModule} from "@angular/common";
import {PrincipalComponent} from "./principal.component";
import { LoginComponent } from './login/login.component';

export let validateAndFlattenComponentImports = undefined;


@NgModule({
  declarations: [
    PrincipalComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class principalmodule {


}
