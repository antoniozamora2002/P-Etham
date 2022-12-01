import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TipoPersonaService} from "../../../../providers/services/tipo-persona.service";

@Component({
  selector: 'app-form-modal-tipo-persona',
  templateUrl: './form-modal-tipo-persona.component.html',
  styleUrls: ['./form-modal-tipo-persona.component.css']
})
export class FormModalTipoPersonaComponent implements OnInit {

  @Input() title: any;
  @Input() tpId: any;
  @Input() item: any;
  //@ts-ignore
  frmTipoPersona: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder:FormBuilder,
              private tipopersonaService: TipoPersonaService) { }

  ngOnInit(): void {
    this.formInit(); //el formulario esta inicializado
    if(this.item){
      this.updateData();
    }
  }

  formInit(): void {
    const controls = {
      tpNombre: ['', [Validators.required]],
      tpDesc: ['', [Validators.required]]

    };
    this.frmTipoPersona= this.formBuilder.group(controls);// construir formulario
  }

  save(): void {
    this.tipopersonaService.add$(this.frmTipoPersona.value).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });//serializa y envia formato tipo JS
  }
  update(): void {
    this.tipopersonaService.update$(this.tpId, this.frmTipoPersona.value).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }
  updateData(): void{
    this.frmTipoPersona.patchValue(this.item);
  }

}
