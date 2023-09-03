// Angular modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryPageComponent } from '../history-page/history-page.component';

// App components
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'history', component: HistoryPageComponent},
]



@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [
    // todo: Implement auth guard
    // FeatureGuardService,
  ]
})
export class AppRoutingModule { }
