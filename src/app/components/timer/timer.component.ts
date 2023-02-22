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
  workInterval: number = this.time;
  seconds: number = 60;
  minute: number = this.time;
  onScreenSeconds: any = 59;
  workTimerSeconds$ !: Observable<any>;
  
  workTimerMinute$ = new Subject<number>();
  
  constructor(){ }
  
  ngOnInit(): void {
    this.workTimerMinute$.subscribe((mins)=>{
      this.time = mins;
    })
  }
  
  startWorkTimer = () => {
    this.workTimerStarted = true;
    this.workTimerSeconds$ = new Observable(observer => {
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
            observer.complete();
            this.initBreakInterval();
          }
        }
    
      },1000);
    });
    
    this.workTimerMinute$.next(this.time - 1);
    // this.workTimerSeconds$.subscribe((sec)=>{
    //   this.onScreenSeconds = sec;
    //   console.log(sec);
    // })
    
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
