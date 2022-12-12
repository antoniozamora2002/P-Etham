import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PersonaService} from "../../../../providers/services/persona.service";
import {TipoPersonaService} from "../../../../providers/services/tipo-persona.service";

@Component({
  selector: 'app-form-modal-persona',
  templateUrl: './form-modal-persona.component.html',
  styleUrls: ['./form-modal-persona.component.css']
})
export class FormModalPersonaComponent implements OnInit {

  @Input() title: any;
  @Input() peId: any;
  @Input() item: any;
  tipopersonas: any = [];

  //@ts-ignore
  frmPersona: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private personaService: PersonaService,
              private tipopersonaService: TipoPersonaService) { }

  Id = document.getElementById('id');


  ngOnInit(): void {
    this.formInit(); //el formulario esta inicializado
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


  formInit(): void {
    const controls = {
      peNombres: ['', [Validators.required]],
      peApellidoP: ['', [Validators.required]],
      peApellidoM: ['', [Validators.required]],
      peDNI: ['', [Validators.required]],
      peFono: ['', [Validators.required]],
      tpId: ['', [Validators.required]],

    };
    this.frmPersona= this.formBuilder.group(controls);// construir formulario
  }

  save(): void {
    let data = Object.assign(this.frmPersona.value, {tipopersona: {tpId: this.frmPersona.value.tpId}});
    this.personaService.add$(data).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });//serializa y envia formato tipo JS
  }
  update(): void {
    let data = Object.assign(this.frmPersona.value, {tipopersona: {tpId: this.frmPersona.value.tpId}});
    this.personaService.update$(this.peId, data).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }
  updateData(): void{
    let data = Object.assign(this.frmPersona.value, {tipopersona: {tpId: this.frmPersona.value.tpId}});
    this.frmPersona.patchValue(data);
  }

}
