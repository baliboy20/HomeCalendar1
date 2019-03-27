import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {CalendarService} from '../../services/calendar.service';
import * as moment from 'moment';
import {CdkVirtualForOf} from '@angular/cdk/scrolling';
import {BehaviorSubject, concat, from, Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators';
import {AppointmentService, IAppointment} from '../../services/appointment.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent implements OnInit {
    @ViewChild(CdkVirtualScrollViewport)
    viewport: CdkVirtualScrollViewport;

    showCal = true;
    @ViewChild(CdkVirtualForOf)
    forof: CdkVirtualForOf<any>;
    items = [];
    currentIdx: any = null;
    currentDate;
    data: BehaviorSubject<any>;
    recordLock = false;
    appointments: { string: Array<IAppointment> };

    constructor(public service: CalendarService, public appointmentsService: AppointmentService) {

    }

    ngOnInit() {
        this.appointmentsService.getAppointments()
            // .subscribe(a => {
            //     console.log('appps', a);
            //     this.appointments = a;
            //     // this.initCalendar();
            // });
        this.initCalendar();
    }

    initCalendar() {

        this.service.initCalendar(moment('23/May/2019'), 1)
            .subscribe(a => {
                this.data = new BehaviorSubject<any>(this.items);
            });
// console.log('items', this.items);
        // this.data
        //     .pipe(tap(console.log))
        //     .subscribe(console.log);
    }

    scrollTo() {
        this.viewport.scrollToIndex(4);
    }

    onContentRendered() {
        console.log('on contenet rendered');
    }

    generateCalendar() {
        // this.showCal = !this.showCal;
        // this.appointmentsService.getAppointments()
        //     .subscribe(a => {
        //         console.log(a);
        //     })
        this.items = (this.service._increaseUpperBoundDate(1));
        this.data.next(this.items);
        this.recordLock = false;

    }

    trackbyFn(idx, item) {
        return idx + item[0];
    }


    scrollIdx(ev, cal) {
        this.currentIdx = moment(this.items[ev][0]).format('MMMM YY');
        ScrollDirection.updateScrollPosition(ev);

        if (ev + 7 > this.viewport.getDataLength() && !this.recordLock) {
            this.recordLock = true;
            // this.generateCalendar();
        }

        if (ev === 0 && ScrollDirection.direction === ScrollDirection.IS_UP) {
            // const a = (this.service._decreaseLowerBoundDate(1));
            // NOTE TO UNDO THIS FOR EXTENDING LOWER BOUND this.data.next(a);
            //
            //  setTimeout(() => {
            //      this.viewport.scrollToIndex(10);
            //      // this.viewport.scrollToOffset(10);
            //      // console.log('FIRED.....');
            //  }, 500);

            this.recordLock = false;
        }
    }
}

class ScrollDirection {
    static IS_UP = -1;
    static IS_DOWN = 1;
    static currIdx = 0;
    static prevIdx = 0;
    static direction: -1 | 1 = 1;

    static updateScrollPosition(idx: number) {
        this.prevIdx = this.currIdx;
        this.currIdx = idx;
        this.direction = this.currIdx > this.prevIdx ? 1 : -1;
    }
}
