import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PersonaTallerService} from "../../../../providers/services/persona-taller.service";

@Component({
  selector: 'app-form-modal-asistencia',
  templateUrl: './form-modal-asistencia.component.html',
  styleUrls: ['./form-modal-asistencia.component.css']
})
export class FormModalAsistenciaComponent implements OnInit {
  @Input() title: any;
  @Input() taId: any;
  @Input() item: any;

  id:any = "";
  id2:any = "";
  radios2: any = "";
  asis:any="";
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private personaTallerService: PersonaTallerService
              ) { }

  persona: any = [];
  //@ts-ignore
  frmPersona: FormGroup;
  fecha = new Date();

  ngOnInit(): void {
    this.getPersonas()
  }



  formInit(): void {
    const controls = {
      petaEstadoAsistencia: this.asis,
      taller: {taId: this.taId},
      persona: {peId: this.id2},
      petaFecha: this.fecha.getDate()+this.fecha.getMonth()+this.fecha.getFullYear()
    };
    this.frmPersona=this.formBuilder.group(controls);
  }


  getPersonas(): void {
    console.log(this.personaTallerService.getByTaller$(this.taId).subscribe(response => {
      this.persona = response.data || [];
    }))
  }
  Actualizar(): void {
  for(let persona of this.persona) {
    this.id = persona.petaId;
    this.id2 = persona.persona.peId;
     this.radios2 = document.getElementsByName(this.id);
    for (var radio of this.radios2){
      if(radio.checked){
        this.asis = radio.value;
      }else{console.log("fue")}
    }
    this.formInit();
    this.update();
    console.log(persona.petaId)
    console.log()
  }
    this.activeModal.dismiss();
  }


  update(): void {this.personaTallerService.update$(this.id, this.frmPersona.value).subscribe(response => {
      if (response.success) {this.activeModal.close({success: true, message:response.message});
      }
    });
  }



}
