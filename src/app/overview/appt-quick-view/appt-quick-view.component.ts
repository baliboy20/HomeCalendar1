import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as moment from 'moment';
import {Moment} from 'moment';
import {IAppointment, IAppointmentInput} from '../../../services/appointment.service';

@Component({
    selector: 'app-appt-quick-view',
    templateUrl: './appt-quick-view.component.html',
    styleUrls: ['./appt-quick-view.component.css']
})
export class ApptQuickViewComponent implements OnInit {

    form: FormGroup;
    description: string = 'xxxxx';
    appointment: IAppointmentInput;

    ngOnInit() {
    }

    constructor(private fb: FormBuilder,
                private dialogRef: MatDialogRef<any>,
                @Inject(MAT_DIALOG_DATA) public data: IAppointmentInput) {
            this.appointment = data;
            this.form = fb.group({
            title: [data.title, Validators.required],
            to: [data.to, Validators.required],
            from: [data.from_timepart, Validators.required],
            // date: [data.date, Validators.required],
            attendees: [data.attendees, Validators.required]
        });
    }

    close() {
        this.dialogRef.close({data: 'this baby is now closed'});
    }

// {date: '1/Apr/2019', from: '13:00', to: '15:00', attendees: 'William', location: 'Charterhouse', title: 'Lease review'},

}
