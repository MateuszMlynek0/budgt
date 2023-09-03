import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IconsService {

    private budgetBoostIcons = [
      'generic-user',
      'generic-logout',
      'generic-house',
      'generic-personal',
      'generic-entertainment',
      'generic-dailyexpenses',
      'generic-other',
      'generic-payments',
      'generic-kids',
      'generic-language',
      'generic-salary',
      'generic-commission',
      'generic-interest',
      'generic-investments',
      'generic-gifts'
    ];


    constructor(private domSanitizer: DomSanitizer, private matIconRegistry: MatIconRegistry) {}

    public loadIcons() {
      this.budgetBoostIcons.forEach(icon => {
        this.matIconRegistry.addSvgIcon(
          icon,
          this.domSanitizer.bypassSecurityTrustResourceUrl(`${environment.baseHref}/assets/icons/${icon}.svg`)
        );
      });
    }


    public getIcons() {
      return this.budgetBoostIcons;
    }
}
