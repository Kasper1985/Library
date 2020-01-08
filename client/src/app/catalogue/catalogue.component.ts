import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';

import { IBook } from '../models';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  private DEBOUNCE_TIME = 500;

  public books: IBook[];
  public searchForm = new FormGroup({
    searchText: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit() {
    this.searchForm.get('searchText').valueChanges
      .pipe(debounceTime(this.DEBOUNCE_TIME))
      .subscribe(text => this.searchTextChanged(text));
  }

  searchTextChanged(text: string) {
    if (text.length > 2) {
      this.search();
    }
  }

  search() {
    this.books = [
      { id: 1, title: 'Dark Tower', author: 'Steven King', year: 1982, exists: false },
      { id: 2, title: 'Відьмак', author: 'А́нджей Сапко́вський', year: 1994, exists: false },
      { id: 3, title: 'Годі, діточки, вам спать', author: 'О.Пчілка', year: 1991, exists: true },
      { id: 4, title: 'Деловые люди', author: 'О.Генри', year: 1998, exists: true }
    ];
  }
}
