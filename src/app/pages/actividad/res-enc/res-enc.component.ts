import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TallerService} from "../../../providers/services/taller.service";
import {ProgramaService} from "../../../providers/services/programa.service";
import {RespuestasencuestaService} from "../../../providers/services/respuestasencuesta.service";
import {PersonaService} from "../../../providers/services/persona.service";
import {EncuestaService} from "../../../providers/services/encuesta.service";

@Component({
  selector: 'app-res-enc',
  templateUrl: './res-enc.component.html',
  styleUrls: ['./res-enc.component.css']
})
export class ResEncComponent implements OnInit {
  @Input() title: any;
  @Input() id: any;
  @Input() item: any;
  form:any="";
  DNI:any="";
  grupo:any="";
  //@ts-ignore
  frmresenc: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder:FormBuilder,
              private encuestaService: EncuestaService,
              private RespuestasencuestaService: RespuestasencuestaService,
              private personaService: PersonaService) { }
  personas: any=[];
  enc:any=[];
  ngOnInit(): void {

  }

  Traer(): void {
    this.form = document.getElementById('DNI');
    this.DNI= this.form.value;
    console.log(this.DNI);
    this.getPersonas();

  }

    getEnc(): void {
      this.encuestaService.getByEnGrupo$(this.grupo).subscribe(response => {
        this.enc = response.data || [];
      });
    }

  getPersonas(): void {
    this.personaService.getByPeDNI$(this.DNI).subscribe(response => {
      this.personas = response.data || [];
    });
    console.log(this.personas[0].tipoPersona.tpNombre);

      if (this.personas[0].tipoPersona.tpNombre === 'poblador') {
        this.grupo = 2;
        this.getEnc();
      } else if (this.personas[0].tipoPersona.tpNombre) {
        this.grupo = 1;
        this.getEnc();
      }



  }

  formInit(): void {
    const controls = {
      personaTaller: ['', [Validators.required]],
      encuesta: ['', [Validators.required]],
      Respuesta: ['', [Validators.required]]
    };
    this.frmresenc= this.formBuilder.group(controls);// construir formulario
  }


}
