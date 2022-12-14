import { Component, OnInit } from '@angular/core';
import {ResEncComponent} from "../../../pages/actividad/res-enc/res-enc.component";
import Swal from "sweetalert2";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RespuestasencuestaService} from "../../../providers/services/respuestasencuesta.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private RespuestasencuestaService: RespuestasencuestaService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModal(): void {
    const modal = this.modalService.open(ResEncComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nueva Encuesta';
    modal.result.then(res => {
      if(res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Respuestas Encuesta',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        })
      }
    })
  }

}
