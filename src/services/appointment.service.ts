import {Inject, Injectable} from '@angular/core';
import {from} from 'rxjs';
import {reduce} from 'rxjs/internal/operators';
import * as moment from 'moment';
import {Moment} from 'moment';
import _date = moment.unitOfTime._date;
import {DateUtils} from '../app/utils/date-utils';
import {HttpService} from './http.service';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {

    constructor(@Inject('HttpService') private http: HttpService) {
    }

    reducer = (acc, app: IAppointment) => {
        let dt = app.from;
        if (dt instanceof Date || dt instanceof moment) {
            dt = moment(dt).toDate().toLocaleDateString();
        }
        const dt1: string = dt as string;
        if (acc.hasOwnProperty(dt1)) {
            acc[dt1].push(app);
        } else {
            acc[dt1] = [app];
        }
        return acc;
    };

    getAppointments() {
        return this.http.findAll().subscribe(console.log);
    }

}

export class AppointmentFactory {
    static instanceOf(): IAppointmentInput {
        return {
            to_timepart: '',
            to_datepart: '',
            to: '',
            from_timepart: '',
            from_datepart: '',
            from: '',
            title: '',
            attendees: '',
            _id: '',
            location: '',
        };
    }
}


export class AppointmentUtils {
    static transformToDbFormat(arg: IAppointmentInput): IAppointment {
        const app: IAppointment = {
            title: arg.title,
            from: DateUtils.appendDateWithTimeAsString(arg.from_datepart, arg.from_timepart),
            to: DateUtils.appendDateWithTimeAsString(arg.to_datepart, arg.to_timepart),
            attendees: arg.attendees,
            location: 'xxx',
            _id: arg._id,
        };
        return app;
    }

    static transformToEditingFormat(arg: IAppointment): IAppointmentInput {
        const app: IAppointmentInput = {
            title: arg.title,
            from: arg.from,
            to: arg.to,
            from_datepart: moment(arg.from).toDate(),
            to_datepart: moment(arg.to).toDate(),
            from_timepart: moment(arg.to).format('hh:mm a'),
            to_timepart: moment(arg.to).format('hh:mm a'),
            attendees: arg.attendees,
            location: 'xxx',
            _id: arg._id,
        };
        return app;
    }
}

export interface IAppointment {
    from: Date | Moment | string;
    to: Date | Moment | string;
    title: string;
    attendees: string;
    location?: string;
    _id: string;
}

export interface IAppointmentInput extends IAppointment {
    from_timepart: string;
    from_datepart: string;
    to_datepart: string;
    to_timepart: string;
}