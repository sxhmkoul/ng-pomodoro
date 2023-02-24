import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Observable, Subject, Subscriber, Subscription, takeUntil } from 'rxjs';
import { StateManagementService } from 'src/app/services/state-management.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnDestroy, AfterViewInit{
  @Input('time') time !: number;
  @Input('message') message !: string;
  @Output() isExpired = new EventEmitter<boolean>() ;
  @ViewChild('start') startBtn !: ElementRef;
  flagSwitch: boolean = false;
  subscriptions = new Subscription();
  secondsSub !: Subscription;
  minuteSub !: Subscription;
  stopTimer : boolean = false;
  workTimerSecondsSubscriber !: any;
  workTimerStarted: boolean = false;
  x : any;
  zeroPlaceholder: string = '00';
  workInterval: number = this.time;
  seconds: number = 60;
  minute: number = this.time;
  onScreenSeconds: any = 59;
  workTimerSeconds$ !: Observable<any>;
  
  workTimerMinute$ = new Subject<number>();
  
  constructor(private state: StateManagementService){ }
  
  ngOnInit(): void {
    this.minuteSub = (this.workTimerMinute$.subscribe((mins)=>{
      this.time = mins;
    }));
  }

  ngAfterViewInit(): void {
    this.autoStart();
  }
  
  startWorkTimer = () => {
    this.workTimerStarted = true;
    this.workTimerSeconds$ = new Observable(observer => {
      let id = setInterval(()=>{
          this.seconds--;
        this.workTimerStarted = true;
        if(this.seconds < 10 && this.seconds > 0){
          observer.next('0'+this.seconds);
        } else observer.next(this.seconds);
    
        if(this.seconds == 0){
          this.workTimerStarted = false;
          this.seconds = 60;
          if(this.time > 0){
            this.workTimerMinute$.next(this.time - 1);
          }
          else {
            clearInterval(id);
            this.resetTimer();
            observer.complete();
            this.initBreakInterval();
          }
        }
    
      },1000);
    });
    
    this.workTimerMinute$.next(this.time - 1);
    this.secondsSub = (this.workTimerSeconds$.subscribe((sec)=>{
      this.onScreenSeconds = sec;
      console.log(sec);
    }))
    
  }
  
  resetTimer = () => {
    this.workTimerStarted = false;
    this.time = this.minute;

  }
  
  pauseTimer = () => {
    
  }

  autoStart(){
    this.startBtn.nativeElement.click();
  }
  
  initBreakInterval = () => {
    // this.flagSwitch = !this.flagSwitch;
    this.state.workModeDisabled = !this.state.workModeDisabled; 
    this.isExpired.emit(this.state.workModeDisabled);
    // this.subscriptions.unsubscribe();
    alert('emitted');
  }


  ngOnDestroy(): void {
    console.log('destruction');  
    this.secondsSub.unsubscribe();
    this.minuteSub.unsubscribe();
  }
}



// const subscriptions = new Subscription();
// subscriptions.add(observable1$.subscribe());
// subscriptions.add(observable2$.subscribe());
// subscriptions.unsubscribe();
