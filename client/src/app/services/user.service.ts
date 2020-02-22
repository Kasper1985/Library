import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { IUser } from '../models';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public registerUser(user: IUser) {
    return this.httpClient.post<IUser>(environment.api + '/user', JSON.stringify(user));
  }
}
