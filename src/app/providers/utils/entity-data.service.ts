import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

export class EntityDataService<T> {

    constructor(
        protected httpClient: HttpClient,
        protected endPoint: string,
    ) {
    }

    public getAll$(): Observable<T> {
        return this.httpClient.get<T>(this.endPoint);
    }

    public getWithQuery$(params: any): Observable<T> {
        return this.httpClient.get<T>(this.endPoint, { params: params });
    }

    public getById$(id: string): Observable<T> {
        return this.httpClient.get<T>(`${this.endPoint}/${id}/`);
    }

    public getByTaller$(id: string): Observable<T> {
    return this.httpClient.get<T>(`${this.endPoint}/Taller/${id}/`);
    }

  public getByEnGrupo$(id: string): Observable<T> {
    return this.httpClient.get<T>(`${this.endPoint}/enGrupo/${id}/`);
  }

  public getByPeDNI$(peDNI: string): Observable<T> {
    return this.httpClient.get<T>(`${this.endPoint}/peDNI/${peDNI}/`);
  }

    public add$(entity: T): Observable<T> {
        return this.httpClient.post<T>(this.endPoint, entity);
    }


    public update$(id: string, entity: T): Observable<T> {
        return this.httpClient.put<T>(`${this.endPoint}/${id}/`, entity);
    }

    public delete$(id: string): Observable<any> {
        return this.httpClient.delete<any>(`${this.endPoint}/${id}/`);
    }
}
