import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constants} from "../../helpers/constants";
import {Assembly} from "../../models/assembly";

@Injectable({
  providedIn: 'root'
})
export class BiddingsService {
  constructor(private http: HttpClient) { }

  public getAll(query: String): Observable<any> {
    return this.http.get(`${Constants.apiBiddingsUrl}?q=${query}`);
  }

  public get(id: Number): Observable<any> {
    return this.http.get(`${Constants.apiBiddingsUrl}/${id}`);
  }

  public post(assembly: Assembly): Observable<any> {
    return this.http.post(`${Constants.apiBiddingsUrl}`, assembly);
  }

  public put(assembly: Assembly): Observable<any> {
    return this.http.put(`${Constants.apiBiddingsUrl}/${assembly.id}`, assembly);
  }

  public delete(id: Number): Observable<any> {
    return this.http.delete(`${Constants.apiBiddingsUrl}/${id}`);
  }
}
