import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';

import { IBook, IBookSearchFilter } from '../models';

import { CatalogueService } from '../services';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  private DEBOUNCE_TIME = 500;

  public books: IBook[];
  public searchForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl(''),
    year: new FormControl(''),
    exists: new FormControl('even')
  });
  public isAddFilterOpen = true;

  constructor(private catalogueService: CatalogueService) { }

  ngOnInit() {
    this.searchForm.get('title').valueChanges
      .pipe(debounceTime(this.DEBOUNCE_TIME))
      .subscribe(text => this.searchTextChanged(text));
  }

  searchTextChanged(text: string) {
    if (text.length > 2) {
      this.search();
    }
  }

  existingSelectedChange(state: boolean | 'event') {
    this.searchForm.get('exists').setValue(state);
  }

  search() {
    const filter: IBookSearchFilter = {
      text: this.searchForm.get('title').value,
      author: this.searchForm.get('author').value,
      year: Number(this.searchForm.get('year').value),
      existing: this.searchForm.get('exists').value
    };

    this.catalogueService.searchBooks(filter).subscribe(books => this.books = books);
  }
}
