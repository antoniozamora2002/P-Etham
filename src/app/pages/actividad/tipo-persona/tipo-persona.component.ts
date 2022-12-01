import { Component, OnInit } from '@angular/core';
import {TipoPersonaService} from "../../../providers/services/tipo-persona.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {FormModalTipoPersonaComponent} from "./form-modal-tipo-persona/form-modal-tipo-persona.component";

@Component({
  selector: 'app-tipo-persona',
  templateUrl: './tipo-persona.component.html',
  styleUrls: ['./tipo-persona.component.css']
})
export class TipoPersonaComponent implements OnInit {

  tipopersonas: any = [];
  constructor(private tipopersonaService: TipoPersonaService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getTipoPersona();
  }

  getTipoPersona(): void {
    this.tipopersonaService.getAll$().subscribe(response => {
      this.tipopersonas = response.data || [];
    });
  }

  openModal(): void {
    const modal = this.modalService.open(FormModalTipoPersonaComponent, {
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
          title: 'TipoPersona',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        })
        this.getTipoPersona();
      }
    })
  }
  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalTipoPersonaComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.tpId = item.tpId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'TipoPersona',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getTipoPersona();
      }
    });
  }
  public onDelete(item: any): void {
    const ID = item.tpId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.tpNombre;
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
          this.tipopersonaService.delete$(ID).subscribe(data => {
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
              this.getTipoPersona();
            }
          });
        }
      });
    }
  }

}
