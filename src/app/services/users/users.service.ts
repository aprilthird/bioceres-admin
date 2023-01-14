import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/helpers/constants';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getAll(query: String): Observable<any> {
    return this.http.get(`${Constants.apiUsersUrl}?q=${query}`);
  }

  public get(id: Number): Observable<any> {
    return this.http.get(`${Constants.apiUsersUrl}/${id}`);
  }

  public post(user: User): Observable<any> {
    return this.http.post(`${Constants.apiUsersUrl}`, user);
  }

  public put(user: User): Observable<any> {
    return this.http.put(`${Constants.apiUsersUrl}/${user.id}`, user);
  }

  public delete(id: Number): Observable<any> {
    return this.http.delete(`${Constants.apiUsersUrl}/${id}`);
  }
}
