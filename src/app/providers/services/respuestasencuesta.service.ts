import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {END_POINTS} from "../utils/end-points";
import { EntityDataService } from '../utils/entity-data.service';
import { IResponse } from '../utils/response';

@Injectable({
  providedIn: 'root'
})
export class RespuestasencuestaService extends EntityDataService<IResponse>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.api+END_POINTS.actividad.resencuesta)
  }
}
