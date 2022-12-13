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
  carreras: any=[];
  tipopersonas: any = [];
  constructor(public activeModal: NgbActiveModal,
              private formBuilder:FormBuilder,
              private carreraService: CarreraService,
              private personaService: PersonaService,
              private tipopersonaService: TipoPersonaService) { }

  Id = document.getElementById('id');

  ngOnInit(): void {
    this.formInit();
    this.getCarreras();
    this.getTipoPersonas();
    if(this.item){
      this.updateData();
    }
  }

  getCarreras(): void {
    this.carreraService.getAll$().subscribe(response => {
      this.carreras = response.data || [];
    });
  };
  getTipoPersonas(): void {
    this.tipopersonaService.getAll$().subscribe(response => {
      this.tipopersonas = response.data || [];
    });
  }

  formInit(): void {
    const controls = {
      peDNI: ['', [Validators.required]],
      peNombres: ['', [Validators.required]],
      peApellidoP: ['', [Validators.required]],
      peApellidoM: ['', [Validators.required]],
      peFono: ['', [Validators.required]],
      tpId: ['', [Validators.required]],
      caId: ['', [Validators.required]],
    };
    this.frmPersona= this.formBuilder.group(controls);// construir formulario
  }

  save(): void {
    let data = Object.assign(this.frmPersona.value,
      {tipoPersona: {tpId: this.frmPersona.value.tpId}},
      {carrera: {caId: this.frmPersona.value.caId}});
    this.personaService.add$(data).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });//serializa y envia formato tipo JS
  }
  update(): void {
    let data = Object.assign(this.frmPersona.value,
      {tipoPersona: {tpId: this.frmPersona.value.tpId}},
      {carrera: {caId: this.frmPersona.value.caId}});
    this.personaService.update$(this.peId, data).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }
  updateData(): void{
    let data = Object.assign(this.item,
      {tpId: this.item.tipoPersona.tpId},
      {caId: this.item.carrera.caId});
    this.frmPersona.patchValue(data);
  }

}
