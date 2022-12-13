import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EncuestaService} from "../../../providers/services/encuesta.service";
import Swal from "sweetalert2";
import {FormModalEncuestaComponent} from "./form-modal-encuesta/form-modal-encuesta.component";

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  encuestas: any= [];
  constructor(private modalService: NgbModal,
              private encuestaService: EncuestaService) { }

  ngOnInit(): void {
    this.getEncuestas();
  }

  getEncuestas():void {
    this.encuestaService.getAll$().subscribe(response => {
      this.encuestas = response.data || [];
    });
  };

  openModal(): void {
    const modal = this.modalService.open(FormModalEncuestaComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nueva';
    modal.result.then(res => {
      if(res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Encuesta',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        })
        this.getEncuestas();
      }
    })
  }
  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalEncuestaComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.enId = item.enId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Encuesta',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getEncuestas();
      }
    });
  }
  public onDelete(item: any): void {
    const ID = item.enId;
    const mensaje = '¿ Desea eliminar? : ' + 'La encuesta';
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
          this.encuestaService.delete$(ID).subscribe(data => {
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
              this.getEncuestas();
            }
          });
        }
      });
    }
  }

}
