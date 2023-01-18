import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: String;
  lang: String;

  constructor(private translateService: TranslateService) {
    this.title = 'bioceres-admin';
    this.lang = 'es';

    this.translateService.setDefaultLang('es');
    this.translateService.use(localStorage.getItem('lang') || 'es');
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'es';
  }
}
