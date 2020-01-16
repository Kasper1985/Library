import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';

import { IBook } from '../models';

import { CatalogueService, EventService } from '../services';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  private DEBOUNCE_TIME = 500;

  public books: IBook[];
  public searchForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    year: new FormControl('', Validators.pattern('^\\d*$')),
    exists: new FormControl('even')
  });
  public isAddFilterOpen = false;

  constructor(private catalogueService: CatalogueService,
              private eventService: EventService) { }

  ngOnInit() {
    this.eventService.pageOpen.emit('catalogue');
    this.searchForm.get('title').valueChanges
      .pipe(debounceTime(this.DEBOUNCE_TIME))
      .subscribe(text => this.searchTextChanged(text));
  }

  searchTextChanged(text: string) {
    if (text.length > 2) {
      this.search();
    }
  }

  existingSelectedChange(state: boolean | 'even') {
    this.searchForm.get('exists').setValue(state);
  }

  search() {
    const filter = {
      text: this.searchForm.get('title').value,
      author: this.searchForm.get('author').value ? this.searchForm.get('author').value : undefined,
      year: this.searchForm.get('year').value ? Number(this.searchForm.get('year').value) : undefined,
      existing: this.searchForm.get('exists').value !== 'even' ? this.searchForm.get('exists').value : undefined,
    };

    this.catalogueService.searchBooks(filter).subscribe(books => this.books = books);
  }
}
