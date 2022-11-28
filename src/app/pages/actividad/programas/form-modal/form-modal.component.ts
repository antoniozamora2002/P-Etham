import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProgramaService} from "../../../../providers/services/programa.service";

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  @Input() title: any;
  @Input() proId: any;
  @Input() item: any;
    //@ts-ignore
  frmPrograma: FormGroup;
  constructor( public activeModal: NgbActiveModal,
               private formBuilder:FormBuilder,
               private programaService: ProgramaService
  ) { }

  ngOnInit(): void {
    this.formInit(); //el formulario esta inicializado
    if(this.item){
    this.updateData();
    }
  }

  formInit(): void {
    const controls = {
      proNombre: ['', [Validators.required]],
      proDescripcion: ['', [Validators.required]]

    };
    this.frmPrograma= this.formBuilder.group(controls);// construir formulario
  }

  save(): void {
    this.programaService.add$(this.frmPrograma.value).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });//serializa y envia formato tipo JS
  }
  update(): void {
    this.programaService.update$(this.proId, this.frmPrograma.value).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }
  updateData(): void{
    this.frmPrograma.patchValue(this.item);
  }
}
