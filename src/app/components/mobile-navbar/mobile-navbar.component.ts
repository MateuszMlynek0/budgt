import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GoogleApiService } from 'src/app/shared/service/google-api.service';
import { environment } from 'src/environments/environment';

export enum ActiveView {
  HOME = "/home",
  HISTORY = "/history",
}

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.sass']
})
export class MobileNavbarComponent {

  @Input() activeItem: any = undefined;
  public userIsOwner: boolean;
  public currentLang: string;
  public languages: string[];
  public sendFeedbackLinkActive: boolean;
  public wizardLinkActive: boolean;
  public ActiveView = ActiveView
  constructor(
    private translateService: TranslateService,
    private readonly googleApi: GoogleApiService,
    public readonly router: Router
  ) {
    this.languages = translateService.getLangs();
    this.currentLang = environment.defaultLang;
  }

  public getActiveLang(lang: string): boolean {
    return this.currentLang === lang;
  }

  useLanguage(language: string): void {
    this.translateService.use(language);
    this.currentLang = language;
  }

  public logout() {
    return this.googleApi.signOut();
  }

}
