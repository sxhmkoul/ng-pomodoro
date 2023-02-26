import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { StateManagementService } from 'src/app/services/state-management.service';

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

constructor(state: StateManagementService){ }

ngOnInit(): void {
}

startWorkTimer = () => {
  
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
}

}
