import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IBook } from '../models';
import { CookieService } from './cookie.service';

@Injectable({providedIn: 'root'})
export class CatalogueService {
  constructor(private cookieService: CookieService,
              private httpClient: HttpClient) {
  }

  public searchBooks(filter: any): Observable<IBook[]> {
    return this.httpClient.post<IBook[]>(`${environment.api}/book/search`, filter);
  }

  public getBook(id: string): Observable<IBook> {
    return this.httpClient.get<IBook>(`${environment}/book/${id}`);
  }
}
