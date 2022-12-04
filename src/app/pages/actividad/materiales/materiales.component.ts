import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/providers/services/material.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {FormModalMaterialesComponent} from "./form-modal-materiales/form-modal-materiales.component";

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {

  materiales: any = [];
  constructor(private materialService: MaterialService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getMateriales();
  }

  getMateriales(): void {
    this.materialService.getAll$().subscribe(response => {
      this.materiales = response.data || [];
    });
  }

  openModal(): void {
    const modal = this.modalService.open(FormModalMaterialesComponent, {
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
          title: 'Materiales',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        })
        this.getMateriales();
      }
    })
  }
  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalMaterialesComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.maId = item.maId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Materiales',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getMateriales();
      }
    });
  }
  public onDelete(item: any): void {
    const ID = item.maId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.maName;
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
          this.materialService.delete$(ID).subscribe(data => {
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
              this.getMateriales();
            }
          });
        }
      });
    }
  }

}
