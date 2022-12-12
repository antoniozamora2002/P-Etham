  import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
  import {MainPageComponent} from "../../core/main-page/main-page.component";
  import {PaginaPrincipalComponent} from "../../core/pagina-principal/pagina-principal.component";

  import { actividadmodule } from "../actividad/actividad.module";
//import { DashboardComponent } from "./pages/dashboard/dashboard.component";
  import { DashboardComponent } from "../dashboard/dashboard.component";
  import {ActividadComponent} from "../actividad/actividad.component";
  import {MaterialesComponent} from "../actividad/materiales/materiales.component";
  import {ProgramasComponent} from "../actividad/programas/programas.component";
  import {TalleresComponent} from "../actividad/talleres/talleres.component";
  import {PersonaComponent} from "../actividad/persona/persona.component";
  import {FacultadComponent} from "../actividad/facultad/facultad.component";
  import {TipoPersonaComponent} from "../actividad/tipo-persona/tipo-persona.component";
  import { UsuarioComponent } from "./usuario.component";
//import * as path from "path";
  const routes: Routes = [
    {
      path:'usuario',
      component: UsuarioComponent,
    }
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule {
}
