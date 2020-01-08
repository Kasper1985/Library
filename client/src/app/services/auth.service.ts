import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IUser } from '../models';
import { CookieService } from './cookie.service';
import { EventService } from './event.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly STORAGE_USER = 'user';

  constructor(private cookieService: CookieService,
              private eventService: EventService) {}

  /**
   * Currently logged in user.
   */
  public get loggedInUser(): IUser {
    return JSON.parse(localStorage.getItem(this.STORAGE_USER));
  }

  /**
   * User login process provider.
   */
  public login(login: string, password: string): Observable<IUser> {
    // Do login request and get user data

    // Mockup user for testing
    const user: IUser = {
      id: 123,
      salutation: 'Mr.',
      nameFirst: 'Yuriy',
      nameLast: 'Varshavskyy',
      email: login
    };

    if (user) {
      localStorage.setItem(this.STORAGE_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.STORAGE_USER);
    }
    this.eventService.userLoggedInEvent.emit(user);

    return of(user);
  }

  /**
   * User logout process provider.
   */
  public logout() {
    localStorage.removeItem(this.STORAGE_USER);
    this.eventService.userLoggedInEvent.emit(null);
  }
}
