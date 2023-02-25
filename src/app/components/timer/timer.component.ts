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
  pauseShellSec : number = 0;
  pauseShellMin : number = 0;
  // pageDirty: boolean = false;
  isPaused: boolean = false;
  minuteSub !: Subscription;
  stopTimer : boolean = false;
  workTimerSecondsSubscriber !: any;
  id:any;
  workTimerStarted: boolean = false;
  x : any;
  zeroPlaceholder: string = '00';
  workInterval: number = this.time;
  seconds: number = 59;
  minute: number = this.time;
  onScreenSeconds: any = 59;
  workTimerSeconds$ !: Observable<any>;
  
  workTimerMinute$ = new Subject<number>();
  
  constructor(public state: StateManagementService){ }
  
  ngOnInit(): void {
    console.log(this.state.status);
    if(this.state.dirtyPage){
      this.startWorkTimer();
    }
    this.minuteSub = (this.workTimerMinute$.subscribe((mins)=>{
      this.time = mins;
    }));
  }

  ngAfterViewInit(): void {
    // this.autoStart();
  }
  
  startWorkTimer = () => {
    this.workTimerStarted = true;
    this.workTimerSeconds$ = new Observable(observer => {
      this.id = setInterval(()=>{
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
            clearInterval(this.id);
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

  resumeWorkTimer = () => {
    this.secondsSub = (this.workTimerSeconds$.subscribe((sec)=>{
      this.onScreenSeconds = sec;
      console.log(sec);
    }))
  }
  
  pauseTimer = () => {
    this.isPaused = true;
    this.pauseShellMin = this.time;
    this.pauseShellSec = this.seconds;
    clearInterval(this.id);
  }

 dirty(){
  this.state.dirtyPage = true;
 }
  
  initBreakInterval = () => {
    // this.flagSwitch = !this.flagSwitch;
    // this.state.workModeDisabled = !this.state.workModeDisabled;
     this.state.workModeDisabled.next(!this.state.status);
    this.isExpired.emit(this.state.status);
    // this.subscriptions.unsubscribe();
    console.log('emitted value:',this.state.status);
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
