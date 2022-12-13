import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProgramaService} from "../../../../providers/services/programa.service";
import {CarreraService} from "../../../../providers/services/carrera.service";
import {FacultadService} from "../../../../providers/services/facultad.service";

@Component({
  selector: 'app-form-modal-carrera',
  templateUrl: './form-modal-carrera.component.html',
  styleUrls: ['./form-modal-carrera.component.css']
})
export class FormModalCarreraComponent implements OnInit {
  @Input() title: any;
  @Input() caId: any;
  @Input() item: any;
  //@ts-ignore
  frmCarrera: FormGroup;
  facultades: any=[];
  constructor( public activeModal: NgbActiveModal,
               private formBuilder:FormBuilder,
               private carreraService: CarreraService,
               private facultadService: FacultadService) { }
  ngOnInit(): void {
    this.formInit(); //el formulario esta inicializado
    this.getFacultades();
    if(this.item){
      this.updateData();
    }
  }
  getFacultades(): void {
    this.facultadService.getAll$().subscribe(response => {
      this.facultades = response.data || [];
    });
  }

  formInit(): void {
    const controls = {
      caNombre: ['', [Validators.required]],
      caColor: ['', [Validators.required]],
      faId: ['', [Validators.required]]
    };
    this.frmCarrera= this.formBuilder.group(controls);// construir formulario
  }

  save(): void {
    let data = Object.assign(this.frmCarrera.value, {facultad: {faId: this.frmCarrera.value.faId}});
    this.carreraService.add$(data).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });//serializa y envia formato tipo JS
  }
  update(): void {
    let data = Object.assign(this.frmCarrera.value, {facultad: {faId: this.frmCarrera.value.faId}});
    this.carreraService.update$(this.caId, data).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }
  updateData(): void{
    let data= Object.assign(this.item, {faId: this.item.facultad.faId});
    this.frmCarrera.patchValue(data);
  }
}
