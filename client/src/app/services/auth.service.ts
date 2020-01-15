import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { IUser } from '../models';
import { CookieService } from './cookie.service';
import { EventService } from './event.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly STORAGE_USER = 'user';

  constructor(private cookieService: CookieService,
              private eventService: EventService,
              private httpClient: HttpClient) {}

  /**
   * Currently logged in user.
   */
  public get loggedInUser(): IUser {
    return JSON.parse(localStorage.getItem(this.STORAGE_USER));
  }

  /**
   * User login process provider.
   */
  public login(email: string, password: string): Observable<any> {
    // Do login request and get user data
    return this.httpClient.post<any>(environment.api + '/user/login', {email, password})
                          .pipe(
                            tap(data => this.getUserInfo(data.access_token)),
                          );
  }

  /**
   * User logout process provider.
   */
  public logout() {
    localStorage.removeItem(this.STORAGE_USER);
    this.eventService.userLoggedInEvent.emit(null);
  }

  private getUserInfo(id: number) {
    this.httpClient.get<any>(`${environment.api}/user/${id}`)
                   .subscribe(user => localStorage.setItem(this.STORAGE_USER, JSON.stringify(user)));
  }
}
