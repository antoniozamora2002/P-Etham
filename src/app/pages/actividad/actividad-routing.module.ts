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
