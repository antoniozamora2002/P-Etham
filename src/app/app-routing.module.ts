import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./core/main-page/main-page.component";
import {NgModule} from "@angular/core";

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import {ProgramasComponent} from "./pages/actividad/programas/programas.component";
import {MaterialesComponent} from "./pages/actividad/materiales/materiales.component";
import {TalleresComponent} from "./pages/actividad/talleres/talleres.component";
import {PaginaPrincipalComponent} from "./core/pagina-principal/pagina-principal.component";
import {PrincipalComponent} from "./pages/principal/principal.component";

import { UsuarioPageComponent } from "./core/usuario-page/usuario-page.component";
import {UsuarioComponent} from "./pages/usuario/usuario.component";

const routes: Routes = [

  {
    path:'',
    component: PaginaPrincipalComponent, //MainPageComponent
    children: [
      {
        path: '',
        component: PrincipalComponent,
        pathMatch: "full"
      },
      {
        path: 'principal',
        loadChildren:()=> import('.//pages/principal/principal.module')
          .then(m => m.principalmodule)
      }]
  },{
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
    path:'',
    component: UsuarioPageComponent,
    children: [
      {
        path: '',
        component: UsuarioComponent,
        component: PrincipalComponent,
        pathMatch: "full"
      },
      {
        path: 'usuario',
        loadChildren:()=> import('.//pages/usuario/Usuario.module')
          .then(m => m.usuarioModule)
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
