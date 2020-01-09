import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IBook, IBookSearchFilter } from '../models';
import { CookieService } from './cookie.service';

@Injectable({providedIn: 'root'})
export class CatalogueService {
  constructor(private cookieService: CookieService) {
  }

  public searchBooks(filter: IBookSearchFilter): Observable<IBook[]> {
    alert(filter.existing);
    return of([
      { id: 1, title: 'Dark Tower', author: 'Steven King', year: 1982, exists: false },
      { id: 2, title: 'Відьмак', author: 'А́нджей Сапко́вський', year: 1994, exists: false },
      { id: 3, title: 'Годі, діточки, вам спать', author: 'О.Пчілка', year: 1991, exists: true },
      { id: 4, title: 'Деловые люди', author: 'О.Генри', year: 1998, exists: true },
      { id: 5, title: 'Тамплієри', author: 'С. Жадан', year: 2017, exists: true },
      { id: 6, title: 'Час Sekond - Hand ', author: 'С.Алексієвич', year: 2013, exists: true },
      { id: 7, title: 'Робін Гуд (переказ старовинних англ.народних балад)', author: '', year: 1969, exists: true },
      { id: 8, title: 'Переяславська рада', author: 'Н.Рибак', year: 1979, exists: true },
      { id: 9, title: 'Кіноповісті. Оповідання', author: 'О.Довженко', year: 1986, exists: true },
    ]);
  }
}
