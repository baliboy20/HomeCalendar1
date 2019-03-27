import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OverviewComponent} from './overview/overview.component';
import {OverviewModule} from './overview/overview.module';
import {SimpleDataEntryComponent} from './simple-data-entry/simple-data-entry.component';

const routes: Routes = [
    {path: 'overview', component: OverviewComponent},
    {path: 'data-entry', component: SimpleDataEntryComponent},
    {path: '', redirectTo: 'dataEntry', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), OverviewModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
