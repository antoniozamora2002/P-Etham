import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarreraService } from 'src/app/providers/services/carrera.service';
import Swal from "sweetalert2";
import {FormModalCarreraComponent} from "./form-modal-carrera/form-modal-carrera.component";

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent implements OnInit {

  carreras: any= [];

  constructor(private carreraService: CarreraService,
              private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getCarreras();
  }

  getCarreras(): void{
    this.carreraService.getAll$().subscribe(response => {
      this.carreras = response.data || [];
    });
  };

  openModal(): void {
    const modal = this.modalService.open(FormModalCarreraComponent, {
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
          title: 'Carrera',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        })
        this.getCarreras();
      }
    })
  }
  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalCarreraComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.caId = item.caId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Carrera',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getCarreras();
      }
    });
  }
  public onDelete(item: any): void {
    const ID = item.caId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.caNombre;
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
          this.carreraService.delete$(ID).subscribe(data => {
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
              this.getCarreras();
            }
          });
        }
      });
    }
  }

}
