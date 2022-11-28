import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialesComponent } from './materiales/materiales.component';
import { ProgramasComponent } from './programas/programas.component';
import { TalleresComponent } from './talleres/talleres.component';
import { ActividadComponent } from './actividad.component';
import {RouterOutlet} from "@angular/router";

import {ProgramaService} from "../../providers/services/programa.service";
import {ActividadRoutingModule} from "./actividad-routing.module";
import { FormModalComponent } from './programas/form-modal/form-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PersonaComponent } from './persona/persona.component';
import {PersonaService} from "../../providers/services/persona.service";
import { FormModalPersonaComponent } from './persona/form-modal-persona/form-modal-persona.component';
import {TallerService} from "../../providers/services/taller.service";
import { FormModalTallerComponent } from './talleres/form-modal-taller/form-modal-taller.component';

export let validateAndFlattenComponentImports = undefined;


@NgModule({
  declarations: [
    MaterialesComponent,
    ProgramasComponent,
    PersonaComponent,
    TalleresComponent,
    ActividadComponent,
    FormModalComponent,
    PersonaComponent,
    FormModalPersonaComponent,
    FormModalTallerComponent
  ],
  imports: [
    CommonModule,
    ActividadRoutingModule,
    ReactiveFormsModule

  ],
  providers: [
    ProgramaService,
    PersonaService,
    TallerService
  ]
})
export class actividadmodule {


}
