import { Component, OnInit } from '@angular/core';
import {TallerService} from "../../../providers/services/taller.service";
import {PersonaService} from "../../../providers/services/persona.service";
import {CarreraService} from "../../../providers/services/carrera.service";
import {PersonaTallerService} from "../../../providers/services/persona-taller.service";

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  talleres: any = [];
  personas: any = [];
  carreras: any = [];
  personatalleres: any = [];
  constructor(private tallerService: TallerService,
              private personaService: PersonaService,
              private carreraService: CarreraService,
              private personatallerService: PersonaTallerService,) { }

  ngOnInit(): void {
    this.getTalleres();
    this.getCarreras();
    this.getPersonas();
    this.getPersonaTalleres();
  }

  getTalleres(): void {
    this.tallerService.getAll$().subscribe(response => {
      this.talleres = response.data || [];
    });
  };

  getPersonas(): void{
    this.personaService.getAll$().subscribe(response =>{
      this.personas = response.data || [];
    });
  };

  getCarreras(): void{
    this.carreraService.getAll$().subscribe(response => {
      this.carreras = response.data || [];
    });
  };

  getPersonaTalleres(): void {
    this.personatallerService.getAll$().subscribe(response => {
      this.personatalleres = response.data || [];
    });
  };

}
