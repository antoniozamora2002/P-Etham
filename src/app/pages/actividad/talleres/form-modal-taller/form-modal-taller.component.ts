import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TallerService} from "../../../../providers/services/taller.service";
import {ProgramaService} from "../../../../providers/services/programa.service";

@Component({
  selector: 'app-form-modal-taller',
  templateUrl: './form-modal-taller.component.html',
  styleUrls: ['./form-modal-taller.component.css']
})
export class FormModalTallerComponent implements OnInit {

  @Input() title: any;
  @Input() taId: any;
  @Input() item: any;
  //@ts-ignore
  frmTaller: FormGroup;
  programas: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder:FormBuilder,
    private tallerService: TallerService,
    private programaService: ProgramaService
  ) { }

  Id = document.getElementById('id');



  ngOnInit(): void {
    this.formInit(); //el formulario esta inicializado
    this.getProgramas();
    if(this.item){
      this.updateData();
    }
  }


  getProgramas(): void {
    this.programaService.getAll$().subscribe(response => {
      this.programas = response.data || [];
    });
  }

  formInit(): void {
    const controls = {
      taTema: ['', [Validators.required]],
      taDesc: ['', [Validators.required]],
      taFecha: ['', [Validators.required]],
      taHora: ['', [Validators.required]],
      taHoraAcademicas: ['', [Validators.required]],
      taLugar: ['', [Validators.required]],
      proId: ['', [Validators.required]],
    };
    this.frmTaller= this.formBuilder.group(controls);// construir formulario
  }

  save(): void {
    let data = Object.assign(this.frmTaller.value, {programa: {proId: this.frmTaller.value.proId}});
    this.tallerService.add$(data).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });//serializa y envia formato tipo JS
  }
  update(): void {
    let data = Object.assign(this.frmTaller.value, {programa: {proId: this.frmTaller.value.proId}});
    this.tallerService.update$(this.taId, data).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }
  updateData(): void {
    //xd
    let data = Object.assign(this.item, {proId: this.item.programa.proId});
    this.frmTaller.patchValue(data);
  }
}

