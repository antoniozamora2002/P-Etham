import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FacultadService} from "../../../../providers/services/facultad.service";

@Component({
  selector: 'app-form-modal-facultad',
  templateUrl: './form-modal-facultad.component.html',
  styleUrls: ['./form-modal-facultad.component.css']
})
export class FormModalFacultadComponent implements OnInit {

  @Input() title: any;
  @Input() faId: any;
  @Input() item: any;
  //@ts-ignore
  frmFacultad: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder:FormBuilder,
              private facultadService: FacultadService) { }

  ngOnInit(): void {
    this.formInit(); //el formulario esta inicializado
    if(this.item){
      this.updateData();
    }
  }

  formInit(): void {
    const controls = {
      faNombre: ['', [Validators.required]],
      faColor: ['', [Validators.required]]

    };
    this.frmFacultad= this.formBuilder.group(controls);// construir formulario
  }

  save(): void {
    this.facultadService.add$(this.frmFacultad.value).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });//serializa y envia formato tipo JS
  }
  update(): void {
    this.facultadService.update$(this.faId, this.frmFacultad.value).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }
  updateData(): void{
    this.frmFacultad.patchValue(this.item);
  }

}
