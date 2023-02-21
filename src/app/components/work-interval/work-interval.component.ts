import { Component, OnInit } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';

@Component({
  selector: 'app-work-interval',
  templateUrl: './work-interval.component.html',
  styleUrls: ['./work-interval.component.scss']
})
export class WorkIntervalComponent implements OnInit{
workTimerStarted: boolean = false;
expired: boolean = false; 
zeroPlaceholder: string = '00';
workInterval: number = 2//25;
seconds: number = 60;
minute: number = 2//25;
onScreenSeconds: any = 59;
workTimerSeconds$ = new Observable(observer => {
  setInterval(()=>{
    this.seconds--;
    this.workTimerStarted = true;
    if(this.seconds < 10 && this.seconds > 0){
      observer.next('0'+this.seconds);
    } else observer.next(this.seconds);

    if(this.seconds == 0){
      this.workTimerStarted = false;
      this.seconds = 60;
      if(this.workInterval > 0)
        this.workTimerMinute$.next(this.workInterval - 1);
      else {
        this.resetTimer();
        this.initBreakInterval();
        observer.complete();
      }
    }

  },1000);
});

workTimerMinute$ = new Subject<number>();

constructor(){ }

ngOnInit(): void {
  this.workTimerMinute$.subscribe((mins)=>{
    this.workInterval = mins;
  })
}

startWorkTimer = () => {
  this.workTimerStarted = true;
  this.workTimerMinute$.next(this.workInterval - 1)
  this.workTimerSeconds$.subscribe((sec)=>{
    this.onScreenSeconds = sec;
    console.log(sec);
  })
  
}

resetTimer = () => {
  this.workTimerStarted = false;
  this.workInterval = 25;
}

pauseTimer = () => {
  
}

initBreakInterval = () => {

}

checkExpiry = ($flag: boolean) => {
  this.expired = $flag;
  // console.log($flag);
}

}
