  import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

//import { DashboardComponent } from "./pages/dashboard/dashboard.component";
//import * as path from "path";
import {ActividadComponent} from "./actividad.component";
import {MaterialesComponent} from "./materiales/materiales.component";
import {ProgramasComponent} from "./programas/programas.component";
import {TalleresComponent} from "./talleres/talleres.component";
import {PersonaComponent} from "./persona/persona.component";
  import {FacultadComponent} from "./facultad/facultad.component";
  import {TipoPersonaComponent} from "./tipo-persona/tipo-persona.component";
  import { CarreraComponent } from "./carrera/carrera.component";
  import { TipoMaterialesComponent } from "./tipo-materiales/tipo-materiales.component";
  import {PersonaTallerComponent} from "./persona-taller/persona-taller.component";
  import {ReporteComponent} from "./reporte/reporte.component";
  import {EncuestaComponent} from "./encuesta/encuesta.component";
const routes: Routes = [
  {
    path:'',
    component: ActividadComponent,
    children: [
      {
        path: 'materiales',
        component: MaterialesComponent,
      },
      {
        path: 'programas',
        component: ProgramasComponent,
      },
      {
        path: 'talleres',
        component: TalleresComponent,
      },
      {
        path: 'personas',
        component: PersonaComponent,
      },
      {
        path: 'facultades',
        component: FacultadComponent,
      },
      {
        path: 'tipopersonas',
        component: TipoPersonaComponent
      },
      {
        path: 'carreras',
        component: CarreraComponent
      },
      {
        path: 'tipomateriales',
        component: TipoMaterialesComponent
      },
      {
        path: 'personatalleres',
        component: PersonaTallerComponent
      },
      {
        path: 'reporte',
        component: ReporteComponent
      },
      {
        path: 'encuestas',
        component: EncuestaComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadRoutingModule {
}
