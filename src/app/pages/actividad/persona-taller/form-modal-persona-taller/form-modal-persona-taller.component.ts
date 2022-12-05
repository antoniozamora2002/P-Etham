import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PersonaTallerService} from "../../../../providers/services/persona-taller.service";
import {PersonaService} from "../../../../providers/services/persona.service";
import {TallerService} from "../../../../providers/services/taller.service";

@Component({
  selector: 'app-form-modal-persona-taller',
  templateUrl: './form-modal-persona-taller.component.html',
  styleUrls: ['./form-modal-persona-taller.component.css']
})
export class FormModalPersonaTallerComponent implements OnInit {

  @Input() title: any;
  @Input() petaId: any;
  @Input() item: any;
  taller: any = [];
  personas: any = [];
  //@ts-ignore
  frmPersonaTaller: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private personaTallerService: PersonaTallerService,
    private personaService: PersonaService,
    private tallerService: TallerService
  ) { }

  Id = document.getElementById('id');

  ngOnInit(): void {
    this.getPersonas();
    this.formInit(); //el formulario esta inicializado
    this.getTaller();
    if(this.item){
      this.updateData();
    }
  }

  getTaller(): void {
    this.tallerService.getAll$().subscribe(response => {
      this.taller = response.data || [];
    });
  }

  getPersonas(): void{
    this.personaService.getAll$().subscribe(response =>{
      this.personas = response.data || [];
    });
  }

  formInit(): void {
    const controls = {
      peEstadoAsistencia: ['', [Validators.required]],
      taller: ['', [Validators.required]],
      persona: ['', [Validators.required]]

    };
    this.frmPersonaTaller= this.formBuilder.group(controls);// construir formulario
  }

  save(): void {
    let data = Object.assign(this.frmPersonaTaller.value, {taller: {taId: this.frmPersonaTaller.value.taller}},{persona: {peId: this.frmPersonaTaller.value.persona}});
    this.personaTallerService.add$(data).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });//serializa y envia formato tipo JS
  }
  update(): void {
    let data = Object.assign(this.frmPersonaTaller.value, {taller: {taId: this.frmPersonaTaller.value.taller}},{persona: {peId: this.frmPersonaTaller.value.persona}});
    this.personaTallerService.update$(this.petaId, data).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }
  updateData(): void {
    //xd
    let data = Object.assign(this.frmPersonaTaller.value, {taller: {taId: this.frmPersonaTaller.value.taller}},{persona: {peId: this.frmPersonaTaller.value.persona}});
    this.frmPersonaTaller.patchValue(data);
  }

}
