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
import {FacultadService} from "../../providers/services/facultad.service";
import {TipoPersonaService} from "../../providers/services/tipo-persona.service";
import { FacultadComponent } from './facultad/facultad.component';
import { FormModalFacultadComponent } from './facultad/form-modal-facultad/form-modal-facultad.component';
import { TipoPersonaComponent } from './tipo-persona/tipo-persona.component';
import { FormModalTipoPersonaComponent } from './tipo-persona/form-modal-tipo-persona/form-modal-tipo-persona.component';
import { CarreraComponent } from './carrera/carrera.component';
import { CarreraService } from 'src/app/providers/services/carrera.service';
import { FormModalCarreraComponent } from './carrera/form-modal-carrera/form-modal-carrera.component';
import { TipoMaterialesComponent } from './tipo-materiales/tipo-materiales.component';
import { TipoMaterialService } from 'src/app/providers/services/tipo-material.service';
import { FormModalTipoMaterialesComponent } from './tipo-materiales/form-modal-tipo-materiales/form-modal-tipo-materiales.component';
import { MaterialService } from 'src/app/providers/services/material.service';
import { FormModalMaterialesComponent } from './materiales/form-modal-materiales/form-modal-materiales.component';
import { PersonaTallerComponent } from './persona-taller/persona-taller.component';
import {PersonaTallerService} from "../../providers/services/persona-taller.service";
import { FormModalPersonaTallerComponent } from './persona-taller/form-modal-persona-taller/form-modal-persona-taller.component';
import { ReporteComponent } from './reporte/reporte.component';

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
    FormModalTallerComponent,
    FacultadComponent,
    FormModalFacultadComponent,
    TipoPersonaComponent,
    FormModalTipoPersonaComponent,
    CarreraComponent,
    FormModalCarreraComponent,
    TipoMaterialesComponent,
    FormModalTipoMaterialesComponent,
    FormModalMaterialesComponent,
    PersonaTallerComponent,
    FormModalPersonaTallerComponent,
    ReporteComponent,
  ],
  imports: [
    CommonModule,
    ActividadRoutingModule,
    ReactiveFormsModule

  ],
  providers: [
    ProgramaService,
    PersonaService,
    TallerService,
    TipoPersonaService,
    FacultadService,
    CarreraService,
    TipoMaterialService,
    MaterialService,
    PersonaTallerService
  ]
})
export class actividadmodule {


}
