import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators/delay';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: Array<User> = [];

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      this.users = data;
    });

  }

  private getJSON(): Observable<any> {
    return this.http.get("./assets/data/users.json");
  }

  public login(user: User): Observable<any> {
    for(let item of this.users) {
      if(item.username == user.username && item.password == user.password) {
        return from([item]).pipe(
          concatMap(item => of(item).pipe(delay(2000)))
        );
      }
    }
    return from([null]).pipe(
      concatMap(item => of(item).pipe(delay(2000)))
    );
  }

  public list(): Observable<any> {
    console.log(this.users);
    return of(this.users);
/*    return from([this.users]).pipe(
      concatMap(item => of(item).pipe(delay(2000)))
    );*/
  }
}
