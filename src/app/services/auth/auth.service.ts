import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators/delay';
import { map } from 'rxjs/internal/operators/map';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { User } from 'src/app/models/user';
import { Constants } from 'src/app/helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<any> {
    return this.http.get(`${Constants.apiLoginUrl}?username=${user.username}&password=${user.password}`);
    // for(let item of this.users) {
    //   if(item.username == user.username && item.password == user.password) {
    //     return from([item]).pipe(
    //       concatMap(item => of(item).pipe(delay(2000)))
    //     );
    //   }
    // }
    // return from([null]).pipe(
    //   concatMap(item => of(item).pipe(delay(2000)))
    // );
  }
}
