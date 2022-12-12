import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PersonaService} from "../../../../providers/services/persona.service";
import {TipoPersonaService} from "../../../../providers/services/tipo-persona.service";
import {CarreraService} from "../../../../providers/services/carrera.service";

@Component({
  selector: 'app-form-modal-persona',
  templateUrl: './form-modal-persona.component.html',
  styleUrls: ['./form-modal-persona.component.css']
})
export class FormModalPersonaComponent implements OnInit {

  @Input() title: any;
  @Input() peId: any;
  @Input() item: any;
  //@ts-ignore
  frmPersona: FormGroup;
  tipopersonas: any = [];
  carreras: any =[];
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private personaService: PersonaService,
              private tipopersonaService: TipoPersonaService,
              private carreraService: CarreraService) { }

  Id = document.getElementById('id');

  ngOnInit(): void {
    this.formInit(); //el formulario esta inicializado
    this.getCarrera();
    this.getTipoPersona();
    if(this.item){
      this.updateData();
    }
  }

  getTipoPersona(): void {
    this.tipopersonaService.getAll$().subscribe(response => {
      this.tipopersonas = response.data || [];
    });
  }

  getCarrera(): void {
    this.carreraService.getAll$().subscribe(response => {
      this.carreras = response.data || [];
    });
  }

  formInit(): void {
    const controls = {
      peNombres: ['', [Validators.required]],
      peApellidoP: ['', [Validators.required]],
      peApellidoM: ['', [Validators.required]],
      peDNI: ['', [Validators.required]],
      peFono: ['', [Validators.required]],
      tipopersona: ['', [Validators.required]],
      carrera: ['', [Validators.required]],

    };
    this.frmPersona= this.formBuilder.group(controls);// construir formulario
  }

  save(): void {
    let data = Object.assign(this.frmPersona.value, {tipopersona: {tpId: this.frmPersona.value.tipopersona}},{carrera: {caId: this.frmPersona.value.carrera}});
    this.personaService.add$(data).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });//serializa y envia formato tipo JS
  }
  update(): void {
    let data = Object.assign(this.frmPersona.value, {tipopersona: {tpId: this.frmPersona.value.tipopersona}},{carrera: {caId: this.frmPersona.value.carrera}});
    this.personaService.update$(this.peId, data).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }
  updateData(): void{
    let data = Object.assign(this.frmPersona.value, {tipopersona: {tpId: this.frmPersona.value.tipopersona}},{carrera: {caId: this.frmPersona.value.carrera}});
    this.frmPersona.patchValue(data);
  }

}
