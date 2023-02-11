import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constants} from "../../helpers/constants";
import {User} from "../../models/user";
import {Assembly} from "../../models/assembly";

@Injectable({
  providedIn: 'root'
})
export class AssembliesService {
  constructor(private http: HttpClient) { }

  public getAll(query: String): Observable<any> {
    return this.http.get(`${Constants.apiAssembliesUrl}?q=${query}`);
  }

  public get(id: Number): Observable<any> {
    return this.http.get(`${Constants.apiAssembliesUrl}/${id}`);
  }

  public post(assembly: Assembly): Observable<any> {
    return this.http.post(`${Constants.apiAssembliesUrl}`, assembly);
  }

  public put(assembly: Assembly): Observable<any> {
    return this.http.put(`${Constants.apiAssembliesUrl}/${assembly.id}`, assembly);
  }

  public delete(id: Number): Observable<any> {
    return this.http.delete(`${Constants.apiAssembliesUrl}/${id}`);
  }
}
