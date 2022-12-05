import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {PrincipalRoutingModule} from "./principal-routing.module";
import {CommonModule} from "@angular/common";
import {PrincipalComponent} from "./principal.component";

export let validateAndFlattenComponentImports = undefined;


@NgModule({
  declarations: [
    PrincipalComponent
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
