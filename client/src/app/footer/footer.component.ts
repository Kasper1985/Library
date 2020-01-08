import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public languages: Array<string> = [ 'en', 'de', 'ua', 'ru' ];
  public selectedLanguage: string;

  constructor(private translate: TranslateService) { }

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
}
