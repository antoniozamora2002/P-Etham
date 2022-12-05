import { Component, OnInit } from '@angular/core';
import {PersonaTallerService} from "../../../providers/services/persona-taller.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {FormModalPersonaTallerComponent} from "./form-modal-persona-taller/form-modal-persona-taller.component";

@Component({
  selector: 'app-persona-taller',
  templateUrl: './persona-taller.component.html',
  styleUrls: ['./persona-taller.component.css']
})
export class PersonaTallerComponent implements OnInit {

personatalleres: any = [];
  constructor(private personatallerService: PersonaTallerService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPersonaTalleres();
  }

  getPersonaTalleres(): void {
    this.personatallerService.getAll$().subscribe(response => {
      this.personatalleres = response.data || [];
    });
  }

  openModal(): void {
    const modal = this.modalService.open(FormModalPersonaTallerComponent, {
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
          title: 'PersonaTaller',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        })
        this.getPersonaTalleres();
      }
    })
  }
  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalPersonaTallerComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.petaId = item.petaId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'PersonaTaller',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getPersonaTalleres();
      }
    });
  }
  public onDelete(item: any): void {
    const ID = item.petaId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.petaId;
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
          this.personatallerService.delete$(ID).subscribe(data => {
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
              this.getPersonaTalleres();
            }
          });
        }
      });
    }
  }

}
