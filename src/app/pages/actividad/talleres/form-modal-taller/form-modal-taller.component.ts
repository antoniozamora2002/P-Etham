import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProgramaService} from "../../../../providers/services/programa.service";
import {TallerService} from "../../../../providers/services/taller.service";

@Component({
  selector: 'app-form-modal-taller',
  templateUrl: './form-modal-taller.component.html',
  styleUrls: ['./form-modal-taller.component.css']
})
export class FormModalTallerComponent implements OnInit {

  @Input() title: any;
  @Input() tallId: any;
  @Input() item: any;
  //@ts-ignore
  frmTaller: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder:FormBuilder,
    private tallerService: TallerService
  ) { }

  ngOnInit(): void {
    this.formInit(); //el formulario esta inicializado
    if(this.item){
      this.updateData();
    }
  }

  formInit(): void {
    const controls = {
      tallTopic: ['', [Validators.required]],
      tallDate: ['', [Validators.required]],
      tallHour: ['', [Validators.required]],
      tallPlace: ['', [Validators.required]],
      tallDesc: ['', [Validators.required]],
      tallHourAcade: ['', [Validators.required]],
      programa: ['', [Validators.required]]


    };
    this.frmTaller= this.formBuilder.group(controls);// construir formulario
  }

  save(): void {
    this.tallerService.add$(this.frmTaller.value).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });//serializa y envia formato tipo JS
  }
  update(): void {
    this.tallerService.update$(this.tallId, this.frmTaller.value).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }
  updateData(): void{
    this.frmTaller.patchValue(this.item);
  }

}
