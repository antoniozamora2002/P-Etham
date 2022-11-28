import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./core/main-page/main-page.component";
import {NgModule} from "@angular/core";

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import {ProgramasComponent} from "./pages/actividad/programas/programas.component";
import {MaterialesComponent} from "./pages/actividad/materiales/materiales.component";
import {TalleresComponent} from "./pages/actividad/talleres/talleres.component";
const routes: Routes = [
  {
    path:'',
    component: MainPageComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: "full"
      },
      {
        path: 'actividad',
        loadChildren:()=> import('./pages/actividad/actividad.module')
          .then(m => m.actividadmodule)

      }]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
