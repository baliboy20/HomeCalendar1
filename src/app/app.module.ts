import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
    MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule,
    MatNativeDateModule, MatTableModule, MatToolbar, MatToolbarModule
} from '@angular/material';
import {CalendarService} from '../services/calendar.service';
import {AppointmentService} from '../services/appointment.service';
import { MousedownDirective } from './overview/appt-quick-view/mousedown.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SimpleDataEntryComponent } from './simple-data-entry/simple-data-entry.component';
import {HttpService} from '../services/http.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
    declarations: [
        AppComponent,
        SimpleDataEntryComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatButtonModule,
        HttpClientModule,
        FormsModule, ReactiveFormsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatTableModule,
        MatToolbarModule,
       CdkTableModule,
        NgxMaterialTimepickerModule,

    ],
    providers: [CalendarService, HttpService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
