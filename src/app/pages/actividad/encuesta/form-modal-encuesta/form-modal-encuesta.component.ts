import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EncuestaService} from "../../../../providers/services/encuesta.service";

@Component({
  selector: 'app-form-modal-encuesta',
  templateUrl: './form-modal-encuesta.component.html',
  styleUrls: ['./form-modal-encuesta.component.css']
})
export class FormModalEncuestaComponent implements OnInit {

  @Input() title: any;
  @Input() enId: any;
  @Input() item: any;
  //@ts-ignore
  frmEncuesta: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder:FormBuilder,
              private encuestaService: EncuestaService) { }

  ngOnInit(): void {
    this.formInit(); //el formulario esta inicializado
    if(this.item){
      this.updateData();
    }
  }

  formInit(): void {
    const controls = {
      enGrupo: ['', [Validators.required]],
      enPregunta: ['', [Validators.required]],
      enOrdenpregunta: ['', [Validators.required]]

    };
    this.frmEncuesta= this.formBuilder.group(controls);// construir formulario
  }

  save(): void {
    this.encuestaService.add$(this.frmEncuesta.value).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });//serializa y envia formato tipo JS
  }
  update(): void {
    this.encuestaService.update$(this.enId, this.frmEncuesta.value).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }
  updateData(): void{
    this.frmEncuesta.patchValue(this.item);
  }

}
