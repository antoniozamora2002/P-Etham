import {Component} from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo: string = 'Mi primer proyecto de Angular';
  curso: string = "Lenguaje de Programación II";
  docente: string = "Hitler Collantes Chules";

  taller: any = {
    nombre: 'La contaminación',
    lugar: 'Plaza de Armas - Quinta Elena',
    fecha: '31/10/2022',
    hora: '8:00 a.m'
  };
}

interface Taller {
  nombre: string,
  lugar: string,
  fecha: string,
  hora: string
}
