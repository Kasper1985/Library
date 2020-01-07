import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { EventService } from './../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public hamburgerState: 'open'|'close' = 'close';

  public languages: Array<string> = [ 'en', 'de', 'ua', 'ru' ];
  public selectedLanguage: string;

  constructor(private translate: TranslateService,
              private eventService: EventService) { }

  ngOnInit() {
    this.setLanguage(this.translate.getDefaultLang());
  }

  setLanguage(value: string) {
    this.selectedLanguage = this.languages.find(l => l === value);
    if (!this.selectedLanguage) {
      this.selectedLanguage = this.languages[0];
    }
    this.translate.setDefaultLang(this.selectedLanguage);
  }

  /**
   * Fires, whenever a hamburger for a side navigation will be clicked
   */
  hamburgerClick() {
    this.hamburgerState = this.hamburgerState === 'open' ? 'close' : 'open';
    this.eventService.hamburgerToggleEvent.emit(this.hamburgerState);
  }
}
