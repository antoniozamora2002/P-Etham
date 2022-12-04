import { Component, OnInit } from '@angular/core';
import {ProgramaService} from "../../../providers/services/programa.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormModalComponent} from "../programas/form-modal/form-modal.component";
import Swal from "sweetalert2";
import {TipoMaterialService} from "../../../providers/services/tipo-material.service";
import {FormModalTipoMaterialesComponent} from "./form-modal-tipo-materiales/form-modal-tipo-materiales.component";

@Component({
  selector: 'app-tipo-materiales',
  templateUrl: './tipo-materiales.component.html',
  styleUrls: ['./tipo-materiales.component.css']
})
export class TipoMaterialesComponent implements OnInit {

  tipomateriales: any = [];
  constructor(private tipomaterialesService: TipoMaterialService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getTipomateriales();

  }

  getTipomateriales(): void {
    this.tipomaterialesService.getAll$().subscribe(response => {
      this.tipomateriales = response.data || [];
    });
  }

  openModal(): void {
    const modal = this.modalService.open(FormModalTipoMaterialesComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
    modal.result.then(res => {
      if(res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'TipoMateriales',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        })
        this.getTipomateriales();
      }
    })
  }
  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalTipoMaterialesComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.tmId = item.tmId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'TipoMateriales',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getTipomateriales();
      }
    });
  }
  public onDelete(item: any): void {
    const ID = item.tmId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.tmName;
    if (ID) {
      Swal.fire({
        title: 'Se eliminará el registro',
        text: `${mensaje}`,
        backdrop: true,
        //animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Estoy de acuerdo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.tipomaterialesService.delete$(ID).subscribe(data => {
            if (data.success) {
              Swal.fire({
                title: 'Eliminado',
                text: data.message,
                backdrop: true,
                //animation: true,
                showConfirmButton: false,
                confirmButtonColor: '#7f264a',
                timer: 1500,
              });
              this.getTipomateriales();
            }
          });
        }
      });
    }
  }


}
