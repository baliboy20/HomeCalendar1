import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReplaySubject} from 'rxjs';
import {AppointmentFactory, AppointmentUtils, IAppointment, IAppointmentInput} from '../../services/appointment.service';
import {isDate} from '@angular/common/src/i18n/format_date';

@Component({
    selector: 'app-simple-data-entry',
    templateUrl: './simple-data-entry.component.html',
    styleUrls: ['./simple-data-entry.component.scss']
})
export class SimpleDataEntryComponent implements OnInit {
    message = '';
    tableDataSource$: ReplaySubject<any> = new ReplaySubject();
    displayedColumns$ = ['title', 'from', 'to', 'attendees', 'titleSelect', 'titleDelete', 'hiddednid'];
    appointForm: FormGroup;
    appointItem: IAppointment;

    constructor(public rep: HttpService, private bldr: FormBuilder) {
        this.createform(this.appointItem);
    }

    ngOnInit() {

    }

    createform(value1: IAppointment) {

        const value: IAppointmentInput = AppointmentFactory.instanceOf();

        this.appointForm = this.bldr.group({
            to_datepart: [value.to_datepart, Validators.required],
            to_timepart: [value.to_timepart, Validators.required],
            from_datepart: [value.from_timepart, Validators.required],
            from_timepart: [value.from_timepart, Validators.required],
            title: [value.title, Validators.required],
            attendees: [value.attendees, Validators.required],
            _id: [value._id]
        });
    }

    rowClicked(itm) {
        itm = AppointmentUtils.transformToEditingFormat(itm);
        console.log('row clicked for:', this.appointForm.value, itm);
        this.appointForm.reset(itm);
        // this.appointForm.value;

        // this.from.setv
    }

    rowClickedDelete(itm) {
        this.rep.delete(itm._id).subscribe(a => this.clickedFindAll());
    }

    clickedAdd(e) {
        const appt_dbFormat = AppointmentUtils.transformToDbFormat(this.appointForm.getRawValue());

        this.rep.add(appt_dbFormat).subscribe(a => this.clickedFindAll());
    }

    clickedClear() {
        this.appointForm.reset(AppointmentFactory.instanceOf());
        (this.appointForm.controls['to_timepart'] as FormControl).setValue('02:15 pm');
    }

    clickedFindAll() {
        this.rep.findAll().subscribe(a => this.tableDataSource$.next(a));
    }

    clickedUpdate() {
        const appt_dbFormat = AppointmentUtils.transformToDbFormat(this.appointForm.getRawValue());
        this.rep.update(appt_dbFormat)
            .subscribe(a => this.clickedFindAll());
    }

    blurred(ev) {
        console.log('blurred date to/from', (ev.target as HTMLInputElement).value);
        // console.log(this.appointForm.controls['to_datepart'].value);

        const todateCtl: FormControl = this.appointForm.controls['to_datepart'] as FormControl;

        console.log('bb', todateCtl.value, 'this is the value');
        if (todateCtl.value instanceof Date === false) {
            (this.appointForm.controls['to_datepart'] as FormControl).setValue(ev.target.value);
        }

        console.log('kk', todateCtl.value, 'this is the value');
    }

}
