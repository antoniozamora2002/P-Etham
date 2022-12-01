import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PersonaService} from "../../../../providers/services/persona.service";

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
              private personaService: PersonaService) { }

  ngOnInit(): void {
    this.formInit(); //el formulario esta inicializado
    if(this.item){
      this.updateData();
    }
  }

  formInit(): void {
    const controls = {
      peNombres: ['', [Validators.required]],
      peApellidoP: ['', [Validators.required]],
      peApellidoM: ['', [Validators.required]],
      peDNI: ['', [Validators.required]],
      peFono: ['', [Validators.required]],
      tipoPersona: ['', [Validators.required]],

    };
    this.frmPersona= this.formBuilder.group(controls);// construir formulario
  }

  save(): void {
    this.personaService.add$(this.frmPersona.value).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });//serializa y envia formato tipo JS
  }
  update(): void {
    this.personaService.update$(this.peId, this.frmPersona.value).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }
  updateData(): void{
    this.frmPersona.patchValue(this.item);
  }

}
