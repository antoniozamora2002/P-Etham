import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder,FormGroup , Validators} from "@angular/forms";
import {MaterialService} from "../../../../providers/services/material.service";
import { TipoMaterialService } from 'src/app/providers/services/tipo-material.service';
import {TallerService} from "../../../../providers/services/taller.service";

@Component({
  selector: 'app-form-modal-materiales',
  templateUrl: './form-modal-materiales.component.html',
  styleUrls: ['./form-modal-materiales.component.css']
})
export class FormModalMaterialesComponent implements OnInit {

  @Input() title: any;
  @Input() maId: any;
  @Input() item: any;
  tipomateriales: any = [];
  taller: any = [];
  //@ts-ignore
  frmMaterial: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder:FormBuilder,
    private materialService: MaterialService,
    private tallerService: TallerService,
    private tipomaterialService: TipoMaterialService
  ) { }

  Id = document.getElementById('id');

  ngOnInit(): void {
    this.formInit(); //el formulario esta inicializado
    this.getTipoMateriales();
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

  getTipoMateriales(): void {
    this.tipomaterialService.getAll$().subscribe(response => {
      this.tipomateriales = response.data || [];
    });
  }

  formInit(): void {
    const controls = {
      maName: ['', [Validators.required]],
      taller: ['', [Validators.required]],
      tmId: ['', [Validators.required]]

    };
    this.frmMaterial= this.formBuilder.group(controls);// construir formulario
  }

  save(): void {
    let data = Object.assign(this.frmMaterial.value,
      {taller: {taId: this.frmMaterial.value.taId}},
      {tipoMateriales: {tmId: this.frmMaterial.value.tmId}});
    this.materialService.add$(data).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });//serializa y envia formato tipo JS
  }
  update(): void {
    let data = Object.assign(this.frmMaterial.value,
      {taller: {taId: this.frmMaterial.value.taId}},
      {tipoMateriales: {tmId: this.frmMaterial.value.tmId}});
    this.materialService.update$(this.maId, data).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }
  updateData(): void {
    //xd
    let data = Object.assign(this.item,
      {taId: this.item.taller.taId},
      {tmId: this.item.tipoMateriales.tmId});
    this.frmMaterial.patchValue(data);
  }
}
