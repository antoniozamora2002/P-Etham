import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { TipoMaterialService } from 'src/app/providers/services/tipo-material.service';
import {ProgramaService} from "../../../../providers/services/programa.service";

@Component({
  selector: 'app-form-modal-tipo-materiales',
  templateUrl: './form-modal-tipo-materiales.component.html',
  styleUrls: ['./form-modal-tipo-materiales.component.css']
})
export class FormModalTipoMaterialesComponent implements OnInit {

  @Input() title: any;
  @Input() tmId: any;
  @Input() item: any;
  //@ts-ignore
  frmTipoMaterial: FormGroup;
  constructor( public activeModal: NgbActiveModal,
               private formBuilder:FormBuilder,
               private tipomaterialesService: TipoMaterialService
  ) { }

  ngOnInit(): void {
    this.formInit(); //el formulario esta inicializado
    if(this.item){
      this.updateData();
    }
  }

  formInit(): void {
    const controls = {
      tmName: ['', [Validators.required]],
      tmDesc: ['', [Validators.required]]

    };
    this.frmTipoMaterial= this.formBuilder.group(controls);// construir formulario
  }

  save(): void {
    this.tipomaterialesService.add$(this.frmTipoMaterial.value).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });//serializa y envia formato tipo JS
  }
  update(): void {
    this.tipomaterialesService.update$(this.tmId, this.frmTipoMaterial.value).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }
  updateData(): void{
    this.frmTipoMaterial.patchValue(this.item);
  }

}
