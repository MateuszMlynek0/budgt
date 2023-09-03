// Angular modules
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// External Modules
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { TranslateCompiler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// Routing
import { AppRoutingModule } from './components/app/app-routing.module';
// Material modules
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
// App components
import { environment } from 'src/environments/environment';
import { AppComponent } from './components/app/app.component';
import { SharedModule } from './shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { BudgetHistoryComponent } from './module/budget-history/budget-history.component';
import { BudgetPieChartComponent } from './module/budget-pie-chart/budget-pie-chart.component';
import { BudgetBarChartComponent } from './module/budget-bar-chart/budget-bar-chart.component';
// App modules
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { BudgetService } from './shared/service/budget.service';
import { GoogleApiService } from './shared/service/google-api.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { InfoDialogModule } from './shared/components/dialogs/dialogs.module';
//service worker
import { ServiceWorkerModule } from '@angular/service-worker';
import { PieChartContainerComponent } from './shared/components/pie-chart-container/pie-chart-container.component';
import { CommonModule } from '@angular/common';
import { MobileNavbarComponent } from './components/mobile-navbar/mobile-navbar.component';
// AoT requires an exported function for factories

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

export function nodeProviderFactory(provider: GoogleApiService) {
  return () => provider.getUserData()
}

export function appInitializerFactory(translateService: TranslateService) {
  return () => {
    translateService.addLangs(environment.supportedLang);
    translateService.setDefaultLang(environment.defaultLang);
    return translateService.use(localStorage.getItem('lang') || environment.defaultLang);
  };
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    BudgetHistoryComponent,
    BudgetPieChartComponent,
    PieChartContainerComponent,
    BudgetBarChartComponent,
    HistoryPageComponent,
    MobileNavbarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    }),
    BrowserModule,
    HttpClientModule,
    SharedModule,
    SharedComponentsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    InfoDialogModule,
    RouterModule.forRoot([]),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [    
    BudgetService,
    {
      provide: APP_INITIALIZER,
      useFactory: nodeProviderFactory,
      deps: [GoogleApiService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
