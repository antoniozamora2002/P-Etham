import { Injectable } from '@angular/core';
import {EntityDataService} from "../utils/entity-data.service";
import { IResponse } from '../utils/response';
import * as Http from "http";
import { HttpClient } from '@angular/common/http';
import {END_POINTS} from "../utils/end-points";

@Injectable({
  providedIn: 'root'
})
export class ProgramaService extends EntityDataService<IResponse>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.api+END_POINTS.actividad.programa)
  }
}
