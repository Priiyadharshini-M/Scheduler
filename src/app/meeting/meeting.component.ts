import { Component, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AgendaService, DayService, MonthService, ResourceDirective, ResourcesDirective, TimeScaleModel, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResourceDirective, ResourcesDirective],
  encapsulation: ViewEncapsulation.None
})
export class MeetingComponent {
  public previousValue = ''
  constructor(private toastrService: ToastrService) {}
  public onPopupOpen(args: any) {
    args.cancel = true;
  }
  onCheckChange(check: boolean, event: any) {
    if(check) {
      event.closest('.e-work-cells').classList.add('checkComplete')
    }
    else{
      event.closest('.e-work-cells').classList.remove('checkComplete')
    }
  }
  store(value:any) {
    this.previousValue = value
  }
  validate(textValue: any, givenSlot: any) {
    const total = textValue.value
    const [given] = givenSlot.innerHTML.split('/')
    console.log('total', total);
    console.log('given', given);
    let pattern = /^\d+$/;
    if(!total.match(pattern) || Number(total)<0 || Number(total)>99) {
      this.toastrService.error('Only slots from 0 to 99 are allowed', 'Error!');
      textValue.value = this.previousValue;
    }
    else if(Number(total)<Number(given)) {
      // alert('The given slot exceeds tha available slot')
      this.toastrService.error('Less than booked slots', 'Error!');
      textValue.value = this.previousValue;
    }
  }
  public timeScale: TimeScaleModel = {
    enable : true,
    interval: 30,
    slotCount: 1
  }

  public infos : Object[] = [
    {
      totalSlot: 4,
      given: 1,
      date: new Date(2023, 4, 1, 12, 30)
    },
    {
      totalSlot: 3,
      given: 2,
      date: new Date(2023, 4, 2, 12, 30)
    },
    {
      totalSlot: 4,
      given: 0,
      date: new Date(2023, 4, 3, 12, 30)
    },
    {
      totalSlot: 4,
      given: 4,
      date: new Date(2023, 4, 4, 12, 30)
    },
    {
      totalSlot: 8,
      given: 3,
      date: new Date(2023, 4, 16, 12, 30)
    },
    {
      totalSlot: 5,
      given: 5,
      date: new Date(2023, 4, 17, 12, 30)
    },
    {
      totalSlot: 7,
      given: 5,
      date: new Date(2023, 4, 18, 12, 30)
    },
  ]
  
  findInfoByDate(date: Date): any {
    var result =  this.infos.find((info : any) => info.date.getTime() === date.getTime());
    if(!result) {
      return {totalSlot:2, given:0}
    }
    return result
  }

}
