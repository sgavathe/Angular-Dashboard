import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent }   from '../ui/chart/chart.component';

export const routes: Routes = [
  { path: '', redirectTo: 'getstats/backup/index.html', pathMatch: 'full' },
  { path: 'dashboard', component: ChartComponent },  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
