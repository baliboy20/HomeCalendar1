import {Injectable} from '@angular/core';
import {CalendarService} from './calendar.service';

// @Injectable({
//     providedIn: 'root'
// })
export class CalendarServiceTest extends CalendarService {

    constructor() {
        super();

    }

    chocky = 'do we now';

    doSome() {
        const a = 6;
    }
}
