import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GoogleApiService, UserInfo } from 'src/app/shared/service/google-api.service';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  readonly logoPro: { img: string, alt: string, class: string, nameHtml: string } = environment.config.logo
  public languages: string[];

  private currentLang: string;
  constructor(private readonly googleApi: GoogleApiService, public translate: TranslateService) { 
    this.languages = this.translate.getLangs();
    this.currentLang = environment.defaultLang;
  }

  ngOnInit(): void {
    console.log("this.languages", this.languages);
  }

  public getActiveLang(lang: string): boolean {
    return this.currentLang === lang;
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem('lang', language);
    moment.locale(language);
    this.currentLang = language;
    // window.location.reload();
  }
  
  public signOut() {
    return this.googleApi.signOut();
  }

}
