import { Injectable } from '@angular/core';
import {EntityDataService} from "../utils/entity-data.service";
import {IResponse} from "../utils/response";
import {HttpClient} from "@angular/common/http";
import {END_POINTS} from "../utils/end-points";

@Injectable({
  providedIn: 'root'
})
export class TallerService extends EntityDataService<IResponse>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.api+END_POINTS.actividad.taller)
  }
}
