import {
    Component, ElementRef, HostBinding, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {IAppointment} from '../../../services/appointment.service';


@Component({
    selector: 'app-day-renderer',
    templateUrl: './day-renderer.component.html',
    styleUrls: ['./day-renderer.component.scss'],
    encapsulation: ViewEncapsulation.Native,
})
export class DayRendererComponent implements OnInit {

    value: string;
    date: Moment;
    backCol: string;
    colors = ['lightgoldenrodyellow', 'lightgreen', 'lightpink', 'silver'];
    private _appointments: IAppointment[] = [];


    mouseLeaveDayListItem(e: Event) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const el: HTMLHtmlElement = e.target as HTMLHtmlElement;
        el.style.border = '1px solid ' + this.backCol;
    }


    mouseEnterDayListItem(e: Event) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const el: HTMLHtmlElement = e.target as HTMLHtmlElement;
        if (el instanceof HTMLDivElement) {
            el.style.border = '1px solid red';
        } else {
            return;
        }
    }


    mousedownDayListItem(event, a) {
    }


    @Input() set appointments(arg: IAppointment[]) {
        console.log('inseide appts', arg);
        this._appointments = arg || [];
    }


    @Input() set item(arg: any) {
        // console.log('setting appointment inside the Renderer', arg, this._appointments);
        this.calcColor(moment(arg).format('M'), moment(arg).format('d'), arg);
        this.value = moment(arg).format('D');
        this.date = arg;
    }


    ngOnInit() {
    }


    calcColor(arg, dayno, dt: Moment) {
        let col = 1;
        if (arg % 3 === 0) {
            col = 1;
        } else if (arg % 2 === 0) {
            col = 2;
        }
        const we = [0, 6];
        if (we.includes(+dayno)) {
            col = 3;
        }
        const today = moment().format('DD/MMM/YYYY');
        if (dt === undefined) {
            console.log('dt is undefined');
            return;
        }
        if (moment(dt).isSame(today)) {
            col = 0;
        }
        this.backCol = this.colors[col];
    }
}

// function Student(config) {
//     return function (target) {
//         Object.defineProperty(target.prototype, 'course', { value: () => config.course });
//     };
// }
//
//
//
// @Student({
//     course: 'angular3'
// })
// class Person {
//     constructor(private firstName, private lastName) {
//     }
//
//     public name() {
//         return `${this.firstName} ${this.lastName}`;
//     }
//
//     protected whoAreYou() {
//         return `Hi i'm ${this.name()}`;
//     }
// }
