import { RouterModule, Routes } from '@angular/router';
import { ChooseNameComponent } from './components/choose-name/choose-name.component';
import { MeiernComponent } from './components/meiern/meiern.component';
import { NgModule } from '@angular/core';

export const appRoutes: Routes = [
  { path: 'meiern', component: MeiernComponent },

  { path: '', pathMatch: 'full', component: ChooseNameComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
