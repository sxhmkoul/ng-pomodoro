import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  @Input('time') time !: number;
  @Output() isExpired = new EventEmitter<boolean>() ;
  workTimerStarted: boolean = false;
  zeroPlaceholder: string = '00';
  workInterval: number = this.time;//25;
  seconds: number = 60;
  minute: number = this.time;//25;
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
        if(this.time > 0)
          this.workTimerMinute$.next(this.time - 1);
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
      this.time = mins;
    })
  }
  
  startWorkTimer = () => {
    this.workTimerStarted = true;
    this.workTimerMinute$.next(this.time - 1)
    this.workTimerSeconds$.subscribe((sec)=>{
      this.onScreenSeconds = sec;
      console.log(sec);
    })
    
  }
  
  resetTimer = () => {
    this.workTimerStarted = false;
    this.time = this.minute;
  }
  
  pauseTimer = () => {
    
  }
  
  initBreakInterval = () => {
    this.isExpired.emit(true);
    alert('emitted');
  }
}
