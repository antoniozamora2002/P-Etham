import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from "./login/login.component";
import {TallerService} from "../../providers/services/taller.service";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {


  constructor(
     private modalService: NgbModal,
     private tallerService: TallerService
  ) { }
  talleres: any =[];
  ngOnInit(): void {
    this.getTaller();
  }
  openModal(): void {
    const modal = this.modalService.open(LoginComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
  }
  getTaller(): void {
    this.tallerService.getAll$().subscribe(response => {
      this.talleres = response.data || [];
    });
  }

}
