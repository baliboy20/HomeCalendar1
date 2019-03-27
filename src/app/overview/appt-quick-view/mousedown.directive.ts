import {Directive, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {DayRendererComponent} from '../day-renderer/day-renderer.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ApptQuickViewComponent} from './appt-quick-view.component';
import {IAppointment} from '../../../services/appointment.service';

@Directive({
    selector: '[appMousedown]'
})
export class MousedownDirective {

    private dialog: MatDialog;

    @Input() data: IAppointment;

    constructor(parent: DayRendererComponent, public ele: ElementRef,
                public rn: Renderer2, dia: MatDialog) {
        // console.log('dia', dia);
        rn.listen(ele.nativeElement, 'mousedown', this.mousedownDayListItem);
        this.dialog = dia;

    }

    mousedownDayListItem = (a) => {
        console.log('Darta', event, a);
        const cfg = new MatDialogConfig();
        cfg.data = this.data;
        cfg.disableClose = true;
        cfg.autoFocus = true;
       const dialogref = this.dialog.open(ApptQuickViewComponent, cfg);
        dialogref.afterClosed()
            .subscribe(a8 => console.log('this store is now closed'));
    };

    openDialog() {


    }

}



