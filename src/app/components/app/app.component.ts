import { Component } from '@angular/core';
import { GoogleApiService, UserInfo } from 'src/app/shared/service/google-api.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { IconsService } from 'src/app/shared/service/icon-service';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public userInfo? : UserInfo;
  public mailSnippets: string[] = [];
  public isMobile: boolean;
  public isLogged: boolean = false;

  constructor (
    private readonly googleApi: GoogleApiService, 
    private deviceDetector: DeviceDetectorService, 
    private iconsService: IconsService,
    private translate: TranslateService) {
      
    this.googleApi.userProfileSubject.subscribe((info: UserInfo) => {
      //info of logged user
      this.userInfo = info;
    }) 
    this.isMobile = this.deviceDetector.isMobile();
    this.iconsService.loadIcons();
    // this.translate.setDefaultLang('en');
    // this.translate.use('en');
  }


  ngOnInit() {
    this.isLogged = this.googleApi.isLoggedIn();
  }

  public logout() {
    return this.googleApi.signOut();
  }
  
}
