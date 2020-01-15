import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IBook, IBookSearchFilter } from '../models';
import { CookieService } from './cookie.service';

@Injectable({providedIn: 'root'})
export class CatalogueService {
  private api = `${environment}/book`;

  constructor(private cookieService: CookieService,
              private httpClient: HttpClient) {
  }

  public searchBooks(filter: IBookSearchFilter): Observable<IBook[]> {
    return this.httpClient.post<IBook[]>(`${environment}/book/filter`, filter);

    // tslint:disable-next-line:max-line-length
    // https://docs.google.com/spreadsheets/d/1dmzonyit4dBNSpoPzF_D82wSE6LxsoDWHmzpvxMNUjY/edit?fbclid=IwAR1l8Y-cTQaWuL61JEx8Hx9zc_yJJwa1C0d1bw9l2do2rTeaLde2J8EV5fs#gid=0

    /*
    const books: IBook[] = [
      { id: '1', title: 'Dark Tower', author: 'Steven King', year: 1982, exists: false },
      { id: '2', title: 'Відьмак', author: 'А́нджей Сапко́вський', year: 1994, exists: false },
      { id: '3', title: 'Годі, діточки, вам спать', author: 'О.Пчілка', year: 1991, exists: true },
      { id: '4', title: 'Деловые люди', author: 'О.Генри', year: 1998, exists: true },
      { id: '5', title: 'Тамплієри', author: 'С. Жадан', year: 2017, exists: true },
      { id: '6', title: 'Час Sekond - Hand ', author: 'С.Алексієвич', year: 2013, exists: true },
      { id: '7', title: 'Робін Гуд (переказ старовинних англ.народних балад)', author: '', year: 1969, exists: true },
      { id: '8', title: 'Переяславська рада', author: 'Н.Рибак', year: 1979, exists: true },
      { id: '9', title: 'Кіноповісті. Оповідання', author: 'О.Довженко', year: 1986, exists: true },
    ];

    return of(books.filter(book =>
      book.title.toLowerCase().includes(filter.text.toLowerCase()) &&
      (filter.author ? book.author.toLowerCase().includes(filter.author.toLowerCase()) : true) &&
      (filter.year ? book.year === filter.year : true) &&
      (filter.existing !== undefined && filter.existing !== 'even' ? book.exists === filter.existing : true)
    ));

    */
  }

  public getBook(id: string): Observable<IBook> {
    return this.httpClient.get<IBook>(`${environment}/book/${id}`);
  }
}
