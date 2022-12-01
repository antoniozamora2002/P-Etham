import { Component, OnInit } from '@angular/core';
import {FacultadService} from "../../../providers/services/facultad.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {FormModalFacultadComponent} from "./form-modal-facultad/form-modal-facultad.component";

@Component({
  selector: 'app-facultad',
  templateUrl: './facultad.component.html',
  styleUrls: ['./facultad.component.css']
})
export class FacultadComponent implements OnInit {

  facultades: any =[];
  constructor(  private facultadService: FacultadService,
                private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getFacultades();
  }

  getFacultades(): void {
    this.facultadService.getAll$().subscribe(response => {
      this.facultades = response.data || [];
    });
  }

  openModal(): void {
    const modal = this.modalService.open(FormModalFacultadComponent, {
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
          title: 'Facultad',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        })
        this.getFacultades();
      }
    })
  }
  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalFacultadComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.faId = item.faId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Facultad',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getFacultades();
      }
    });
  }
  public onDelete(item: any): void {
    const ID = item.faId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.faNombre;
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
          this.facultadService.delete$(ID).subscribe(data => {
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
              this.getFacultades();
            }
          });
        }
      });
    }
  }

}
